const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');

function loadBooks() {
    try {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'books.csv'))
            .pipe(csv())
            .on('data', async (row) => {
                try {
                    const newBook = await prisma.book.create({
                        data: {
                            title: row.title,
                            authors: row.authors,
                            averageRating: row.average_rating,
                            isbn: row.isbn,
                            isbn13: row.isbn13,
                            languageCode: row.language_code,
                            numPages: row.num_pages,
                            ratingsCount: row.ratings_count,
                            textReviewsCount: row.text_reviews_count,
                            publicationDate: row.publication_date,
                            publisher: row.publisher,
                            createdAt: new Date(),
                        }
                    });
                } catch (err) {
                    console.log(`Error processing row: ${row.title}`);
                }
            })
            .on('end', () => {
                console.log("done!");
            });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    loadBooks,
}
