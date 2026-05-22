import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageSection, Theme } from "@/types/editor.types";

interface Props {
  sections: PageSection[];
  theme: Theme;
  previewMode: "desktop" | "tablet" | "mobile";
}

export default function LivePreview({ sections, theme, previewMode }: Props) {
  const activeSections = sections.filter(s => s.isActive).sort((a, b) => a.order - b.order);

  const renderSection = (section: PageSection) => {
    const style = {
      backgroundColor: theme.background,
      color: theme.textColor,
      fontFamily: theme.fontFamily,
    };

    switch (section.type) {
      case "hero":
        return (
          <div className="min-h-[500px] flex items-center justify-center text-center relative"
            style={{ ...style, backgroundImage: `url(${section.content.bgImage})`, backgroundSize: 'cover' }}>
            <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${section.content.overlayOpacity ?? 0.5})` }} />
            <div className="relative z-10 px-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">{section.content.heading}</h1>
              <p className="text-xl mb-8 text-white/95">{section.content.subHeading}</p>
              <Button style={{ backgroundColor: theme.primary }}>{section.content.ctaText}</Button>
            </div>
          </div>
        );
      // Products & Cart Payment preview cases goes here...
      default: return null;
    }
  };

  const maxWidthClass = previewMode === "mobile" ? "max-w-[375px]" : previewMode === "tablet" ? "max-w-[768px]" : "max-w-6xl";

  return (
    <div className={`mx-auto border-[8px] border-gray-700 rounded-3xl overflow-hidden shadow-2xl bg-white transition-all duration-300 ${maxWidthClass}`}>
      {activeSections.map(sec => (
        <React.Fragment key={sec.id}>
          {renderSection(sec)}
        </React.Fragment>
      ))}
    </div>
  );
}