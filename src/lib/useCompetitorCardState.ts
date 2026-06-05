import { useState, useEffect } from "react";

export function useCompetitorCardState(
  type: "player" | "team",
  id: number,
  name: string,
  key: string,
  score: number,
  onChangeName: (type: "player" | "team", id: number, name: string) => void,
  onInitializeScore: (key: string, score: number) => void
) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  useEffect(() => {
    setEditedName(name);
  }, [name]);

  useEffect(() => {
    onInitializeScore(key, score);
  }, [key, score]);

  const handleSave = () => {
    setIsEditing(false);
    if (editedName.trim()) {
      onChangeName(type, id, editedName.trim());
    } else {
      setEditedName(name);
    }
  };

  return {
    isEditing,
    setIsEditing,
    editedName,
    setEditedName,
    handleSave,
  };
}
