const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const csv = require('csv-parser');
const path = require('path');
const fs = require('fs');
const { create } = require("domain");

function loadBooks() {
    try {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'books.csv'))
            .pipe(csv())
            .on('data', async (data) => {
                try {
                    const book = await prisma.book.create(
                        {
                            data: {
                                title: data.title,
                                authors: data.authors,
                                averageRating: data.average_rating,
                                isbn: data.isbn,
                                isbn13: data.isbn13,
                                languageCode: data.language_code,
                                numPages: data.num_pages,
                                ratingsCount: data.ratings_count,
                                textReviewsCount: data.text_reviews_count,
                                publicationDate: data.publication_date,
                                publisher: data.publisher,
                            }
                        }
                    )
                }
                catch (err) {
                    console.log(err);
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
