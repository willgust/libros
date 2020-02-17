
import BookModel from '../models/BookModel'

var books = null;
class BookService {

    constructor() {
        books = [];

        books.push(new BookModel("title", "autor", "details", "genere", 10,
            10));

            books.push(new BookModel("asdf", "autor", "details", "genere", 10,
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