require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/Book");

async function fixBooks() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ebook_creator");
  const books = await Book.find({});
  
  for (const book of books) {
    if (!book.coverImage || book.coverImage.trim() === "") {
      const prompt = `An aesthetic ebook cover for a book titled ${book.title} by ${book.author}`;
      const coverImage = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=1200&nologo=true`;
      
      book.coverImage = coverImage;
      await book.save();
      console.log(`Updated book: ${book.title}`);
    } else {
      console.log(`Book already has cover: ${book.title} -> ${book.coverImage}`);
    }
  }
  
  console.log("Done");
  process.exit(0);
}

fixBooks().catch(console.error);
