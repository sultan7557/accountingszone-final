// src/components/GlobalButtonRedirector.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalButtonRedirector() {
  const router = useRouter();
  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button, a[href*="learn-more"], a[href*="learn more"]');
      
      if (!button) return;
      
      // If it's a link with learn-more in the href, redirect
      if (button instanceof HTMLAnchorElement && 
          (button.href.includes('learn-more') || button.href.includes('learn more'))) {
        e.preventDefault();
        router.push("/contact/get-a-consultation");
        return;
      }
      
      // For buttons, check the text content
      const buttonText = button.textContent?.trim().toLowerCase() || "";
      
      const redirectKeywords = [
        "get started",
        "schedule a demo",
        "request assessment",
        "book a consultation",
        "request a demo",
        "get a consultation",
        "request asset management consultation",
        "request audit readiness checklist",
        "request complimentary financial review",
        "get a free consultation",
        "request complimentary assessment",
        "request risk assessment",
        "request inventory efficiency assessment",
        "request reporting demo",
        "request expense management assessment",
        "request documentation assessment",
        "request integration consultation",
        "request cleanup assessment",
        "learn more",
        "learnmore",
        "schedule a tax savings assessment",
        "schedule a demonstration",
        "schedule a dashboard demo",
        "connect with our specialists",
        "contact us today",
        "discover how we can help",
        "access knowledge base",
        "enroll now",
        "explore resources",
        "get a free quote",
        "get a free assessment",
        "get a free demo",
        "get a free trial",
        "schedule demo",
        "view deadlines",
        "set reminders",
        "view state deadlines",
        "view latest updates",
        "subscribe to alerts",
        "subscribe to updates",
        "ask a question",
        "ask our experts",
        "learn about security",
        "security compliance",
        "view security details",
        "get support",
        "contact support",
        "connect with support", 
        "get templates",
        "get a free template",
        "get a free assessment",
        "explore automation tools",
        "schedule demo",
        "schedule a consultation",
        "view federal deadlines",
        "view integration guides",
        "enable syncing now",
        "create an account",
        "share your feedback",
        "register now",
        "start learning",
        "view case studies",
        "download e-books",        
        "access tutorials",
        "start calculating",
        "browse forms library",
        "start filing now",
        "access reports now",
        



      ];

      // Check if the button text contains any of the redirect keywords
      if (redirectKeywords.some(keyword => buttonText.includes(keyword))) {
        e.preventDefault();
        router.push("/contact/get-a-consultation");
      }
    };
    
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);
  
  return null;
}
