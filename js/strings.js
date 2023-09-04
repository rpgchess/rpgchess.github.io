function setLanguage(lang = "en-US") {
    return {
        bio: {
            fullName:   'Claudio Almeida Martins',
            smallName:  'Claudio A. Martins',
            firstName:  'Claudio',
            middleName: 'Almeida',
            lastName:   'Martins'
        },
        screens: {
            home:         (lang === "pt-BR")? 'Início' : 'Home',
            about:        (lang === "pt-BR")? 'Sobre' : 'About',
            professional: (lang === "pt-BR")? 'Profissional' : 'Professional',
            education:    (lang === "pt-BR")? 'Educa&ccedil;&atilde;o' : 'education',
            skills:       (lang === "pt-BR")? 'Qualifica&ccedil;&otilde;es' : 'Skills',
            portifolio:   (lang === "pt-BR")? 'Portifolio' : 'Portifolio',
            contact:      (lang === "pt-BR")? 'Contato' : 'Contact'
        }
    }

}


