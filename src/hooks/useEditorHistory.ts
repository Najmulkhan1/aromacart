import { useState, useCallback } from "react";

export function useEditorHistory<T>(initialState: T) {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialState);
  const [future, setFuture] = useState<T[]>([]);

  // ম্যাক্সিমাম কয়টি হিস্ট্রি সেভ রাখবে (মেমরি বাঁচানোর জন্য)
  const MAX_HISTORY_LENGTH = 20;

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  // Undo ফাংশন
  const undo = useCallback(() => {
    if (!canUndo) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
  }, [canUndo, past, present, future]);

  // Redo ফাংশন
  const redo = useCallback(() => {
    if (!canRedo) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setFuture(newFuture);
    setPresent(next);
  }, [canRedo, past, present, future]);

  // নতুন কোনো চেঞ্জ আসলে সেটি সেভ করার ফাংশন
  const set = useCallback(
    (newPresent: T | ((current: T) => T)) => {
      setPresent((currentPresent) => {
        // যদি callback function পাঠানো হয়, তাহলে সেটি রান করে নতুন ভ্যালু নিবে
        const resolvedPresent =
          newPresent instanceof Function ? newPresent(currentPresent) : newPresent;

        // যদি ভ্যালু সেম থাকে, তাহলে হিস্ট্রিতে সেভ করার দরকার নেই
        if (JSON.stringify(currentPresent) === JSON.stringify(resolvedPresent)) {
          return currentPresent;
        }

        // নতুন চেঞ্জ আসলে past এ সেভ হবে এবং future ক্লিয়ার হয়ে যাবে
        setPast((prev) => [...prev, currentPresent].slice(-MAX_HISTORY_LENGTH));
        setFuture([]);
        return resolvedPresent;
      });
    },
    []
  );

  // পুরো হিস্ট্রি রিসেট করার ফাংশন
  const reset = useCallback((newInitialState: T) => {
    setPast([]);
    setPresent(newInitialState);
    setFuture([]);
  }, []);

  return { state: present, set, undo, redo, canUndo, canRedo, reset };
}