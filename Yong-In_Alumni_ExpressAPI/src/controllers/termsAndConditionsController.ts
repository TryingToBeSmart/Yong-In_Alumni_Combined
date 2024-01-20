// Function to render the termsAndConditions page
const renderTermsAndConditions = (req, res) => {
    res.render("termsAndConditions", {title: "Terms"}); // Renders the termsAndConditions.pug file
};

module.exports = {
    renderTermsAndConditions
};