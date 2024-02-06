import { useEffect, useState } from "react";

type AddLoadingFunction = () => void;
type RemoveLoadingFunction = () => void;

export default (): [boolean, AddLoadingFunction, RemoveLoadingFunction] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaders, setLoaders] = useState<number>(0);

  const addLoading = () => setLoaders(1);

  const removeLoading = () => setTimeout(() => setLoaders(0), 200);

  useEffect(() => {
    setLoading(loaders > 0);
  }, [loaders]);

  return [loading, addLoading, removeLoading];
};
