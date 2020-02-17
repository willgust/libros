
class BookModel {
    constructor(title, autor, details, genere, pages,
        puntuation) {
        this.title = title;
        this.autor = autor;
        this.details = details;
        this.genere = genere;
        this.page = pages;
        this.puntuation = puntuation;
        this.favourite = false;
    }

    

    getTitle() {
        return this.title;
    }

    getAutor() {
        return this.autor;
    }

    getDetails() {
        return this.details;
    }

    getGenere() {
        return this.genere;
    }

    getPage() {
        return this.page;
    }

    getPuntuation() {
        return this.puntuation;
    }

    getFavourite() {
        return this.favourite;
    }
    setFavourite(a_value){
        this.favourite = a_value;
    }

}

export default BookModel;