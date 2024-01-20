// Function to render the news page
const renderNews = (req, res) => {
    res.render("news", {title: "News"}); // Renders the news.pug file
};

module.exports = {
    renderNews
};