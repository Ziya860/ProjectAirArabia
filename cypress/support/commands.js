Cypress.on('uncaught:exception', (err, runnable) => {
    // Returning false here prevents Cypress from failing the test
    return false;
});



Cypress.Commands.add('loginMygovWithUI', (iframe) => {



    cy.visit('my.gov.az');
    cy.contains('Daxil').click();

    cy.origin('digital.login.gov.az', function () {

        cy.contains('nömrəsi').click();

        cy.get(':nth-child(1) > .input-wrapper > .ng-untouched').type('2GYQBHB')

        cy.get(':nth-child(2) > .input-wrapper > .ng-untouched').type('2161991wS228455@');

        cy.contains('Daxil').click();

        cy.wait(5000)
    })
})

Cypress.Commands.add('loginToMygovProdZ', function () {
    cy.request({
        method: 'POST',
        url: 'https://apidigital.login.gov.az/ssoauth/api/v1/logIn/personLogin',
        body: {
            "password": "2161991wS228455@",
            "mobileKey": null,
            "username": "2GYqBHB"
        }
    }).then((response) => {
        const token = response.body.data.token;

        cy.request({
            method: 'GET',
            url: 'https://mygov-api.e-gov.az/dg-compositor-gateway/api/v1/oauth/authorize-request-url',
        }).then((response) => {

            const authorize_request_url = response.body.authorize_request_url;

            const urlParams = new URLSearchParams(authorize_request_url.split('?')[1]);
            const clientId = urlParams.get('client_id');
            const state = urlParams.get('state');

            cy.request({
                method: 'POST',
                url: 'https://apidigital.login.gov.az/ssoauth/oauth2/auth/codes',
                headers: {
                    'Accept': '*/*',
                    'Origin': 'https://digital.login.gov.az',
                    'Sec-Fetch-Mode': 'cors',
                    'content-type': 'application/json',
                    'priority': 'u=1, i',
                    'Referer': 'https://digital.login.gov.az/',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-site': 'same-site',
                    'Host': 'apidigital.login.gov.az',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'az',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
                    'Authorization': `${token}`
                },
                body: {
                    'client_id': clientId,
                    'state': state,
                    'response_type': "code",
                    'redirect_uri': "https://my.gov.az"
                }
            }).then((response) => {
                const code = response.body.code;



                cy.request({
                    method: 'POST',
                    url: `https://mygov-api.e-gov.az/dg-compositor-gateway/api/v2/oauth/login`,
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'accept-language': 'en-US,en;q=0.9',
                        'content-type': 'application/json',
                        'origin': 'https://my.gov.az',
                        'priority': 'u=1, i',
                        'referer': 'https://my.gov.az/',
                        'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'cross-site',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
                    },
                    body: {
                        auth_code: code,
                        state: state
                    }

                }).then((response) => {


                    cy.log(JSON.stringify(response));
                    console.log('Full Response:', response);
                    const accessToken = response.body.access_token;
                    const refreshToken = response.body.refresh_token;

                    console.log('Access Token:', accessToken);
                    console.log('Refresh Token:', refreshToken);

                    cy.window().then((win) => {
                        win.localStorage.setItem('__iria-auth', JSON.stringify({

                            "state": {
                                "authData": {
                                    "login_type": "simpleLogin",
                                    "sso_access_token": null,
                                    "access_token": accessToken,
                                    "refresh_token": refreshToken,
                                    "expires_in": 3600,
                                    "certs": [],
                                    "profile": {
                                        "user_id": "329efb99-bae9-4458-a02e-d464ac506dca",
                                        "name": "ZİYAD",
                                        "surname": "ƏBİLOV",
                                        "patronymic": "AZƏR OĞLU",
                                        "pin": "2GYQBHB",
                                        "citizenship": "Azerbaijan",
                                        "preferred_lang": null
                                    },
                                    "idCard": {
                                        "activation_date": {
                                            "time_stamp": "27.11.2020"
                                        },
                                        "active": true,
                                        "document_number": "AA2419135",
                                        "doc_type": "ID",
                                        "expiry_date": {
                                            "date": "24.11.2030"
                                        },
                                        "marital_status_list": [
                                            {
                                                "marital_status": "Subay"
                                            }
                                        ],
                                        "military_status_list": [
                                            {
                                                "military_status": "Hərbi mükəlləfiyyətli"
                                            }
                                        ],
                                        "organization": {
                                            "name": "Asan 3"
                                        },
                                        "nationality": {
                                            "code3a": "AZE",
                                            "name_az": "Azərbaycan Respublikası"
                                        },
                                        "person_az": {
                                            "birth_city": "BAKI",
                                            "birth_country": {
                                                "code3a": "AZE",
                                                "name_az": "Azərbaycan Respublikası"
                                            },
                                            "birth_date": {
                                                "date": "16.03.1991"
                                            },
                                            "blood_type": "AB(IV)Rh-",
                                            "entry_language": null,
                                            "eye_color": "Qəhvəyi",
                                            "name": "ZİYAD",
                                            "height": 171,
                                            "address": null,
                                            "iamas_address": {
                                                "full_address": "BAKI ŞƏHƏRİ, NƏSİMİ RAYONU, ŞÖVQİYAR ABDULLAYEV KÜÇƏSİ, EV 23, MƏNZİL 146"
                                            },
                                            "pin": "2GYQBHB",
                                            "gender": "Kişi",
                                            "surname": "ƏBİLOV",
                                            "images": [],
                                            "patronymic": "AZƏR OĞLU"
                                        },
                                        "issuing_date": {
                                            "date": "25.11.2020"
                                        }
                                    },
                                    "oAuthBase": "https://digital.login.gov.az",
                                    "profilePhoto": ""
                                }
                            },
                            "version": 0

                        }));
                    });

                    cy.visit('https://my.gov.az/')

                    cy.reload()


                });
            });
        });
    });
})
// cy.findByPlaceholder('Axtar').type('pass',{force:true})
// cy.get('.text-sm.font-bold').eq(0).contains('AM')
Cypress.Commands.add('findByPlaceholder', function (placeholderText) {

    cy.get(`[placeholder="${placeholderText}"]`)

})

