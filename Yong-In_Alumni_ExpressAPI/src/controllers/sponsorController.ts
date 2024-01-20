// Function to render the sponsor page
const renderSponsor = (req, res) => {
    res.render("sponsors", {title: "Sponsors"}); // Renders the sponsors.pug file
};

module.exports = {
    renderSponsor
};