
exports.verifySurveyForm = function(data) {
    var invalidFields = [];
    if (data.name === undefined) invalidFields.push("name");
    if (data.age === undefined) invalidFields.push("age");
    if (data.sex === undefined) invalidFields.push("sex");
    if (data.address === undefined) invalidFields.push("address");
    if (data.isInterested === undefined) invalidFields.push("solar panel question");
    if (data.reason === undefined) invalidFields.push("reason");
    return invalidFields;
}