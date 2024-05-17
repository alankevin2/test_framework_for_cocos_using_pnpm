### Using rollup to bundle ts files for pnpm dependencies use


# protobufjs
讓你在nodejs環境（web不確定）可以動態載入 .proto檔，並生成相關物件，可序列化反序列化
註：動態讀取proto，我任為不是好的實現，不應考慮，參考下面pbjs作法

# pbjs 
預生成js, ts的工具 （一次只能build一個proto檔案），提供各model的decode/encode做法，並將type暴露出去