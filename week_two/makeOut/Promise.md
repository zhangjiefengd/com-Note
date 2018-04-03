#### Promise ####


静态方法

`resolve`,`reject`,`all`,`race`

`resolve`=>传递无误参数then添加成功的函数;

`reject` =>把错误的信息传递给后面的catch函数;

`all`=>接受所有的正确参数或是所有的错误;

`race`=>接受最先结束的信息。

串行执行异步任务，更加清晰的展现了执行代码和处理的结果