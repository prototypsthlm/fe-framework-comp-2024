import { useState, useEffect } from 'react';

export default function Progress({ items }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const count = items.length;
    const done = items.reduce((totalDone, item) => item.isDone ? totalDone += 1 : totalDone, 0);

    setProgress(count > 0 ? done / count * 100 : 0);
  }, [items]);

  return (
    <div className="w-96 mx-auto my-4 bg-gray-200 h-[4px]">
      <div
        className="h-[4px] bg-blue-500 transition-[width] ease-out duration-[600ms]"
        style={{width: `${progress}%`}}>
      </div>
    </div>
  );
}
