import { useState, useEffect } from "react";
import { persistenceControl, setPersistence, arenaStore } from "./arenaStore";

export function usePersistence(navigate: (path: string) => void) {
  const [persistEnabled, setPersistEnabled] = useState(persistenceControl.enabled);
  const [showPersistConfirm, setShowPersistConfirm] = useState(false);
  const [isSavingAnim, setIsSavingAnim] = useState(false);

  useEffect(() => {
    if (!persistEnabled) {
      setIsSavingAnim(false);
      return;
    }

    setIsSavingAnim(true);
    const initialTimer = setTimeout(() => setIsSavingAnim(false), 2400);

    const interval = setInterval(() => {
      setIsSavingAnim(true);
      setTimeout(() => setIsSavingAnim(false), 2400);
    }, 120000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [persistEnabled]);

  const handlePersistToggle = () => {
    if (persistEnabled) {
      setShowPersistConfirm(true);
    } else {
      setPersistence(true);
      setPersistEnabled(true);
    }
  };

  const confirmDisablePersist = () => {
    localStorage.removeItem("arena-store-v1");
    setPersistence(false);
    arenaStore.clearAndReset();
    setPersistEnabled(false);
    setShowPersistConfirm(false);
    navigate("/");
  };

  return {
    persistEnabled,
    showPersistConfirm,
    isSavingAnim,
    setShowPersistConfirm,
    handlePersistToggle,
    confirmDisablePersist,
  };
}
