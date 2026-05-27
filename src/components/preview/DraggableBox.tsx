"use client";

import React, { useState } from "react";
import { Rnd } from "react-rnd";

interface DraggableBoxProps {
  initialText?: string;
  defaultWidth?: number;
  defaultHeight?: number;
}

export default function DraggableBox({ 
  initialText = "Drag or Resize Me!", 
  defaultWidth = 250, 
  defaultHeight = 150 
}: DraggableBoxProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });

  return (
    <>
      {/* @ts-ignore - Suppresses unnecessary TypeScript red underlines */}
      <Rnd
        size={{ width: size.width, height: size.height }}
        position={{ x: position.x, y: position.y }}
        
        onDragStop={(e: any, d: any) => {
          setPosition({ x: d.x, y: d.y });
        }}
        
        onResizeStop={(e: any, direction: any, ref: any, delta: any, newPosition: any) => {
          setSize({
            width: parseInt(ref.style.width, 10) || defaultWidth,
            height: parseInt(ref.style.height, 10) || defaultHeight,
          });
          setPosition(newPosition);
        }}
        
        bounds="parent"
        className="bg-white border-2 border-emerald-500 shadow-xl rounded-xl flex items-center justify-center p-4 overflow-hidden relative group !absolute"
      >
        <div className="text-center w-full h-full flex flex-col justify-center items-center">
          <h3 className="font-bold text-gray-800">{initialText}</h3>
          <p className="text-xs text-gray-400 mt-2">
            {size.width}px × {size.height}px
          </p>
        </div>

        <div className="absolute inset-0 border-dashed border-2 border-transparent group-hover:border-blue-400 pointer-events-none rounded-xl" />
      </Rnd>
    </>
  );
}