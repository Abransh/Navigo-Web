 < !--Backend / src / mail / templates / password - reset - confirmation.hbs-- >
    < !DOCTYPE;
html >
    React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("meta", { charset: "utf-8" },
                React.createElement("meta", { name: "viewport", content: "width=device-width" },
                    React.createElement("title", null, "Password Reset Successful"),
                    React.createElement("style", null,
                        "body ",
                        font - family,
                        ": 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0; } .container ",
                        max - width,
                        ": 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); } .header ",
                        text - align,
                        ": center; padding: 20px 0; border-bottom: 1px solid #eee; } .logo ",
                        font - size,
                        ": 24px; font-weight: bold; color: #003366; } .content ",
                        padding,
                        ": 30px 20px; } .success-icon ",
                        text - align,
                        ": center; font-size: 48px; color: #4CAF50; margin-bottom: 20px; } .button ",
                        display,
                        ": inline-block; padding: 12px 24px; background-color: #F3A522; color: white; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 20px 0; } .footer ",
                        text - align,
                        ": center; font-size: 12px; color: #999; padding: 20px 0; border-top: 1px solid #eee; } @media only screen and (max-width: 600px) ",
                            .container,
                        " ",
                        width,
                        ": 100%; border-radius: 0; } }")),
                React.createElement("body", null,
                    React.createElement("div", { "class": "container" },
                        React.createElement("div", { "class": "header" },
                            React.createElement("div", { "class": "logo" }, { appName: appName })),
                        React.createElement("div", { "class": "content" },
                            React.createElement("div", { "class": "success-icon" }, "\u2713"),
                            React.createElement("h2", null, "Password Reset Successful"),
                            React.createElement("p", null,
                                "Hello ",
                                { firstName: firstName },
                                ","),
                            React.createElement("p", null,
                                "Your password for your ",
                                { appName: appName },
                                " account has been successfully reset."),
                            React.createElement("p", null, "You can now log in to your account with your new password."),
                            React.createElement("div", { style: "text-align: center;" },
                                React.createElement("a", { href: "{{ loginLink }}", "class": "button" }, "Go to Login")),
                            React.createElement("p", null, "If you did not make this change, please contact our support team immediately as your account may have been compromised.")),
                        React.createElement("div", { "class": "footer" },
                            React.createElement("p", null,
                                "\u00A9 ",
                                { year: year },
                                " ",
                                { appName: appName },
                                ". All rights reserved."),
                            React.createElement("p", null,
                                "If you have any questions, please contact us at ",
                                React.createElement("a", { href: "mailto:{{ supportEmail }}" }, { supportEmail: supportEmail }))))))));
