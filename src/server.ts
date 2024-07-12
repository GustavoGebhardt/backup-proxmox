import sendMessage from './telegram/sendMessage';
import addRows from './sheets/addRow';

addRows("C5", "Aqui estou!")
sendMessage("Hello, World!")