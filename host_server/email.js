exports.resetEmailHtml = (user, code) => {
    return (
        `<p>Hi ${user},<br><br><br>
        
        We've received a request to reset the password for your account.<br>
        If this was not you, you can ignore this email.
        <br><br>
        To reset your password enter the code provided below into the website:<br/>
        <h1><b>${code}</b></h1>
        </p>
        `
    );
};

exports.resetEmailText = (user, code) => {
    return (
        `Hi ${user},
        
        We recieved a request to reset the password for your account.
        If this was not you, you can ignore this email.
        
        To reset your password enter the code provided below into the website:
        ${code}
        `
    );
};

exports.validateEmailHtml = (code) => {
    return (
        `<p>Hi,<br><br><br>
        
        You have registered an account on Host Larnaca! Before being able<br>
        to use your account, you need to verify that this is your email.<br>
        If this was not you, you can ignore this email.
        <br><br>
        To verify your account, enter the code on the website as requested:<br/>
        <b>${code}</b>
        <br><br>
        Kind Regards,<br>
        Host Larnaca
        </p>`
    );
};

exports.validateEmailText = (code) => {
    return (
        `Hi,

        You have registered an account on Host Larnaca, before being able
        to use your account, you need to verify that this is your email
        address by entering the code on the website as requested: ${code}

        Kind Regards, Host Larnaca`
    );
};