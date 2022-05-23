function ZeroEsquerda(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
  };
  
const DataHoje = (modo, diasDif=0, data=null) => {

    let currentDate = ''

    var semana = [
    "Domingo", 
    "Segunda", 
    "Terça", 
    "Quarta", 
    "Quinta", 
    "Sexta", 
    "Sábado"
    ];
    var semSimpl = [
    "Dom", 
    "Seg", 
    "Ter", 
    "Qua", 
    "Qui", 
    "Sex", 
    "Sab"
    ]; 
    var mes = [
    "Janeiro", 
    "Fevereiro", 
    "Março", 
    "Abril", 
    "Maio", 
    "Junho", 
    "Julho", 
    "Agosto", 
    "Setembro", 
    "Outubro", 
    "Novembro", 
    "Dezembro"
    ]
    var mesSimpl = [
    "Jan", 
    "Fev", 
    "Mar", 
    "Abr", 
    "Mai", 
    "Jun", 
    "Jul", 
    "Ago", 
    "Set", 
    "Out", 
    "Nov", 
    "Dez"
    ]
    
    if (data) {
    var date = new Date(data)
    } else {
    var date = new Date()
    }

    date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + diasDif);

    var day   = new Date(date).getDate(); 
    var month = new Date(date).getMonth() + 1; 
    var year  = new Date(date).getFullYear(); 
    var week  = new Date(date).getDay();  
    var hours = new Date(date).getHours(); 
    var min   = new Date(date).getMinutes(); 
    var sec   = new Date(date).getSeconds();

    switch (modo) {
    case 1:   // Ex: 31/12/2020
        currentDate = ZeroEsquerda(day, 2) + '/' + ZeroEsquerda(month, 2) + '/' + year
        break;
    case 2:   // Ex: 2020-12-31
        currentDate = year + '-' + ZeroEsquerda(month, 2) + '-' + ZeroEsquerda(day, 2)
        break;
    case 3:   // Ex: Quinta, 31 de Dezembro
        currentDate = semana[week] + ', ' + day + ' de ' + mes[month-1]
        break;
    case 4:   // Ex: 31 de Dezembro
        currentDate = day + ' de ' + mes[month]
        break;
    case 5:   // Ex: Dezembro de 2020
        currentDate = mes[month-1] + ' de ' + year
        break;
    case 6:   // Ex: 2020
        currentDate = year
        break;
    case 7:   // Ex: 31 de Dezembro de 2020
        currentDate = day + ' de ' + mes[month-1] + ' de ' + year
        break;
    case 8:   // Ex: Quinta
        currentDate = semana[week]
        break;
    default:
        currentDate = ''
        break;
    }

    return (currentDate)
}


export { DataHoje }