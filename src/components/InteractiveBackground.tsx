"use client";

import { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Using { alpha: false } tells the browser the canvas is fully opaque, optimizing compositing
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const foodEmojis = ["🍕", "🍔", "🍩", "🌮", "🌭", "🥤", "🍲", "🥗", "🍙", "🍣", "🍜", "🍰", "🧋", "👩‍💻", "💻", "🖨️", "💿", "🖲️", "⌨️", "🖱️", "🛜", "🤖"];

    class FoodItem {
      x: number;
      y: number;
      emoji: string;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.emoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
        this.size = Math.random() * 25 + 20;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x < -50) this.x = canvas!.width + 50;
        if (this.x > canvas!.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas!.height + 50;
        if (this.y > canvas!.height + 50) this.y = -50;

        // Mouse repel (using squared distance for performance)
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 22500) { // 150 * 150
          const dist = Math.sqrt(distSq);
          this.x -= (dx / dist) * 2;
          this.y -= (dy / dist) * 2;
        }
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.rotation);
        ctx!.font = `${this.size}px Arial`;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.globalAlpha = 0.4; // Make emojis less bright and more subtle
        // Shadows are removed here because text shadows in canvas are extremely slow
        ctx!.fillText(this.emoji, 0, 0);
        ctx!.restore();
      }
    }

    class PowEffect {
      x: number;
      y: number;
      text: string;
      life: number;
      maxLife: number;
      scale: number;
      rotation: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const texts = ["BAM!", "POW!", "ZAP!", "WHAM!"];
        this.text = texts[Math.floor(Math.random() * texts.length)];
        this.maxLife = 25; // Shorter life
        this.life = this.maxLife;
        this.scale = 0.1;
        this.rotation = (Math.random() - 0.5) * 0.5;
      }

      update() {
        this.life--;
        this.scale += (1.5 - this.scale) * 0.4; // Faster spring effect
      }

      draw() {
        if (this.life <= 0) return;
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.rotation);
        ctx!.scale(this.scale, this.scale);

        ctx!.globalAlpha = this.life / this.maxLife;

        // Draw starburst
        ctx!.beginPath();
        const spikes = 8;
        const outerRadius = 50;
        const innerRadius = 25;
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes;
          if (i === 0) ctx!.moveTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          else ctx!.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        }
        ctx!.closePath();
        ctx!.fillStyle = "#F0E14A"; // Comic Gold
        ctx!.fill();
        ctx!.lineWidth = 4;
        ctx!.strokeStyle = "#ED1D24"; // Marvel Red
        ctx!.stroke();

        // Draw text
        ctx!.font = "900 24px 'Impact', sans-serif";
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillStyle = "#050505"; // Black text
        ctx!.fillText(this.text, 0, 0);

        // Text stroke
        ctx!.lineWidth = 1;
        ctx!.strokeStyle = "#ffffff";
        ctx!.strokeText(this.text, 0, 0);

        ctx!.restore();
      }
    }

    let foods: FoodItem[] = [];
    let pows: PowEffect[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      foods = [];
      const isMobile = window.innerWidth < 768;
      const multiplier = isMobile ? 50000 : 30000;
      const numFoods = Math.floor((canvas.width * canvas.height) / multiplier);
      for (let i = 0; i < numFoods; i++) foods.push(new FoodItem());
    };

    let lastMouseX = mouseX;
    let lastMouseY = mouseY;

    const animate = () => {
      // Clear with solid background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Check mouse speed for pows (using squared distance)
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq > 400 && Math.random() < 0.35) { // Lower speed threshold, higher probability
        pows.push(new PowEffect(mouseX, mouseY));
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Draw a highly performant subtle red radial glow around the mouse
      // This replaces the expensive 2300+ circle calculations that caused lag
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
      gradient.addColorStop(0, "rgba(237, 29, 36, 0.15)");
      gradient.addColorStop(1, "rgba(237, 29, 36, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw foods
      foods.forEach((food) => {
        food.update();
        food.draw();
      });

      // Handle pows
      for (let i = pows.length - 1; i >= 0; i--) {
        pows[i].update();
        pows[i].draw();
        if (pows[i].life <= 0) pows.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}

