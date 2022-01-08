let apiQuotes = [];
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const newQuoteButton = document.querySelector("#new-quote");
const twitterButton = document.querySelector("#twitter");
const loader = document.querySelector("#loader");

newQuoteButton.onclick = () => {
    newQuote();
};

twitterButton.onclick = () => {
    const twitterUrl = `https:/twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
};

const newQuote = () => {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!quote.author)
    {
        authorText.textContent = "UnKnown";
    }
    else
    {
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 50)
    {
        quoteText.classList.add('long-quote');
    }
    else
    {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    complete();
};

const getQuotes = async () => {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try
    {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error)
    {
    }
};

const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden =  true;
};

getQuotes();
