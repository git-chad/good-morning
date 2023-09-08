"use client";
import React, { useEffect, useRef } from "react";
import p5 from "p5";

export default function P5Component() {

  const wrapper = useRef();
  const p5Instance = useRef(null);
  let spaceGrotesk;
  let graphic;

  const hueRef = useRef(0);
  const waveRef = useRef(0.05);
  const xRef = useRef(1);
  const yRef = useRef(1);
  const firstWordRef = useRef("good");
  const secondWordRef = useRef("morning");

  const createGraphic = (p) => {
    const hslColor = `hsl(${hueRef.current}, 100%, 50%)`;

    graphic.clear();
    graphic.textFont(spaceGrotesk);
    graphic.fill(p.color(hslColor));
    graphic.textSize(300);
    graphic.textLeading(220);
    graphic.textAlign(p.CENTER, p.CENTER);
    graphic.text(`${firstWordRef.current}\n${secondWordRef.current}`, 600, 300);
  };

  const sketch = (p) => {
    p.preload = () => {
      spaceGrotesk = p.loadFont("/spacegrotesk-medium.otf");
    };

    p.setup = () => {
      p.createCanvas(1200, 600);
      graphic = p.createGraphics(1200, 600);
      createGraphic(p);
    };

    p.draw = () => {
      p.background("#101917");

      const tileSize = 10;

      for (let x = 0; x < 120; x += 1) {
        for (let y = 0; y < 60; y += 1) {
          const distX =
            p.sin(p.frameCount * waveRef.current + x * 0.5 + y * 0.2) * 10;
          const distY =
            p.sin(p.frameCount * waveRef.current + x * 0.5 + y * 1) * 5;

          const sx = x * tileSize + distX * xRef.current;
          const sy = y * tileSize + distY * yRef.current;
          const sw = tileSize;
          const sh = tileSize;

          const dx = x * tileSize;
          const dy = y * tileSize;
          const dw = tileSize;
          const dh = tileSize;

          p.image(graphic, dx, dy, dw, dh, sx, sy, sw, sh);
        }
      }
    };
  };

  useEffect(() => {
    p5Instance.current = new p5(sketch, wrapper.current);
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
}, []);


  return (
    <main className="w-screen h-screen bg-[#101917]">
      <header className="actions w-full h-24 flex justify-end items-center">
        <div className="flex flex-col mt-28 space-y-3 mr-6">
          <input
            className="speed"
            type="range"
            min="0"
            max="0.555"
            step="0.005"
            defaultValue={waveRef.current}
            onChange={(e) => {
              waveRef.current = Number(e.target.value);
            }}
          ></input>

          <input
            type="range"
            min="0"
            max="360"
            defaultValue="0"
            onChange={(e) => {
              hueRef.current = e.target.value;
              createGraphic(p5Instance.current);
            }}
          />
          <input
            type="range"
            min="0"
            max="5"
            step="0.005"
            defaultValue="1"
            onChange={(e) => {
              xRef.current = e.target.value;
              createGraphic(p5Instance.current);
            }}
          />
          <input
            type="range"
            min="0"
            max="5"
            step="0.005"
            defaultValue="1"
            onChange={(e) => {
              yRef.current = e.target.value;
              createGraphic(p5Instance.current);
            }}
          />

          {/* text inputs */}
          <input
            className="first-line rounded-md p-1 bg-white bg-opacity-30 text-white"
            type="text"
            defaultValue={firstWordRef.current}
            onChange={(e) => {
              firstWordRef.current = e.target.value;
              createGraphic(p5Instance.current);
            }}
          ></input>
          <input
            className="second-line rounded-md p-1 bg-white bg-opacity-30 text-white"
            type="text"
            defaultValue={secondWordRef.current}
            onChange={(e) => {
              secondWordRef.current = e.target.value;
              createGraphic(p5Instance.current);
            }}
          ></input>
        </div>
      </header>
      <div ref={wrapper}></div>
    </main>
  );
}
