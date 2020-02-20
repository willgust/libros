
import BookModel from '../models/BookModel'

var books = null;
class BookService {

    constructor() {
        books = [];

        books.push(new BookModel("El Señor de los anillos", "Tolkien", "Historia de aventuras", "Fantasia", 3000,
            10));

            books.push(new BookModel("Harry Poter", "J.K Roulin", "Historia de un mago", "Juveniles", 600,
            10));

            books.push(new BookModel("Nacidos de la bruma", "Brandon Sanderson", "resumen de algo", "Juveniles", 400,
            10));

            books.push(new BookModel("Juego de tronos", "Martins", "historia sin final", "Fantasia", 700,
            10));
    }

    AddBook(title, autor, details, genere, pages,
        puntuation, onSucces) {

        let book = new BookModel(title, autor, details, genere, pages,
            puntuation);

        books.push(book);
    }

    DeleteBook(book){
        books = books.filter(function (el) { return el.getTitle() != book.getTitle(); });
    }

    GetMyBooks(onSucces) {
        onSucces(books)
    }

}





export default BookService;