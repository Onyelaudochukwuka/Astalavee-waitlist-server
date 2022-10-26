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
    const response = await mailchimp.lists.addListMember("04fa38c0c1", {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
        },
    });

    console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`,
    );
};

export default addMemberTopList;
