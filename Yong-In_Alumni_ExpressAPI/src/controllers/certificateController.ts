// Function to render the certificate page
const renderCertificate = (req, res) => {
    res.render("certificate", {title: "Certificate"}); // Renders the certificate.pug file
};

module.exports = {
    renderCertificate
};