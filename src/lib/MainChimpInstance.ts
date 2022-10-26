const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_KEY,
    server: "us9",
});

export const addMemberTopList = async (
    email: string,
    firstName: string,
    lastName: string,
) => {
    console.log(await mailchimp.lists.getList("04fa38c0c1"))
    const response = await mailchimp.lists.addListMember("04fa38c0c1", {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
        },
    });

    return response.id;
};

export default addMemberTopList;
