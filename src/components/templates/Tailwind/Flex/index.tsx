const Flex = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-4">
        <div className="flex-1 bg-blue-500 h-20">Item 1</div>
        <div className="flex-1 bg-green-500 h-20">Item 2</div>
        <div className="flex-1 bg-red-500 h-20">Item 3</div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex-1 bg-yellow-500 h-20">Item 4</div>
        <div className="flex-1 bg-purple-500 h-20">Item 5</div>
      </div>
    </div>
  );
};

export default Flex;
