function hide() {
    var x = document.getElementById("hide");
    x.style.display = "none";
    var x = document.getElementById("hide2");
    x.style.display = "none";
    document.getElementById("footer").innerHTML = "Kachain Jantalat"
}
function show() {
    var x = document.getElementById("hide");
    x.style.display = "block";
    var x = document.getElementById("hide2");
    x.style.display = "block";
}
function runPrefix() {
    var x = document.getElementById("prefix");
    for (var i = 1; i < 129; i++) {
        var option = document.createElement("option");
        var number;
        if (i < 64) {
            var n = BigNumber(2).power(64 - i).number.reverse()
            // var n2=BigNumber(2).power(64-i)
            // console.log(n2.toString())
            number = n.join("").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " network/64";
            // console.log(number)

        } else {
            var n = BigNumber(2).power(128 - i).number.reverse()
            // var n2=BigNumber(2).power(128-i)
            // console.log(n2.toString())
            number = n.join("").replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " addresses";
            // console.log(number)
        }
        option.text = i + " (" + number + ")";
        option.value = i
        if (i == 64) {
            option.selected = true
        }
        x.add(option);
    }
}

function runSubnet(ip) {
    var prefix = parseInt(document.getElementById("prefix").value)
    var div = document.getElementById("subnet")
    for (var i = prefix + 1, j = 1; i <= 128; i++ , j++) {
        var x = BigNumber(2).power(j).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        var a = document.createElement("a");
        a.text = x + " networks /" + i
        a.href = "javascript:getValue(\"" + ip + "\"," + i + ")"
        a.value = i
        div.appendChild(a)
        var p = document.createElement("span");
        p.textContent = " (" + BigNumber(2).power(128 - i).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ") addresses"
        div.appendChild(p)
        var br = document.createElement("br");
        div.appendChild(br)
    }
}

function convertIPtoHex2(ip) {
    var ipv6 = ip.split(":")
    var ipv6toHex2 = [];
    for (var i = 0; i < ipv6.length; i++) {
        for (var j = 0; j < ipv6[i].length; j += 2) {
            ipv6toHex2.push(ipv6[i].substr(j, j + 2))
            //console.log(ipv6[i].substr(j,j+2))
        }
    }
    return ipv6toHex2;
}

function convertIPtoBi(ip) {
    var ipv6 = ip.split(":")
    var ipv6toBi = [];
    for (var i = 0; i < ipv6.length; i++) {
        var temp = ConvertBase.hex2bin(ipv6[i])
        if (temp.length < 16) {
            var n = 16 - temp.length
            var zero = ""
            for (var j = 0; j < n; j++) {
                zero += "0"
            }
            temp = zero + temp;
        }
        ipv6toBi.push(temp)
    }


    return ipv6toBi;
}

function convertIPtoDec(ip) {
    var ipv6toDec = [];
    for (var i = 0; i < ip.length; i++) {
        ipv6toDec.push(ConvertBase.hex2dec(ip[i]))
    }
    return ipv6toDec;
}

function calculateRangeNetwork(ip, prefix) {
    var subnet = ""
    for (var i = 0; i < 128; i++) {
        if (i < prefix) {
            subnet += '1'
        } else {
            subnet += '0'
        }
    }
    //console.log(ip)
    //console.log(subnet)
    var temp = ""
    for (var j = 0; j < 128; j++) {
        if (ip.substring(j, j + 1) == '1' && subnet.substring(j, j + 1) == '1') {
            temp += '1'
        } else {
            temp += '0'
        }
    }
    var temp2 = []
    for (var j = 0; j < 128; j += 4) {
        temp2.push(temp.substring(j, j + 4))
    }

    //console.log(temp2.toString())
    return temp2;

}
function calculateRangeSubnet(ip, prefix) {
    var subnet = ""
    for (var i = 0; i < 128; i++) {
        if (i < prefix) {
            subnet += '1'
        } else {
            subnet += '0'
        }
    }
    var temp = ""
    for (var j = 0; j < 128; j++) {
        if (j < prefix) {
            if (ip.substring(j, j + 1) == '1' && subnet.substring(j, j + 1) == '1') {
                temp += '1'
            } else {
                temp += '0'
            }
        } else {
            temp += '1'
        }
    }
    var temp2 = []
    for (var j = 0; j < 128; j += 4) {
        temp2.push(temp.substring(j, j + 4))
    }
    return temp2;
}


function calculateRangeNetworkToHex(ip) {
    var temp = []
    for (var i = 0; i < ip.length; i += 4) {
        var str = ConvertBase.bin2hex(ip[i]) + ConvertBase.bin2hex(ip[i + 1]) + ConvertBase.bin2hex(ip[i + 2]) + ConvertBase.bin2hex(ip[i + 3])
        temp.push(str)
    }
    return temp;
}
function calculateIntegerIP(ip) {
    var total = BigNumber(0)
    for (var i = 0; i < ip.length; i++) {
        if (ip.substring(i, i + 1) != '0') {
            var n = 32 - i - 1
            total.plus(BigNumber(16).power(n).multiply(ip.substring(i, i + 1)))
        }

    }
    console.log(total.toString())
    return total;
}
function convertFullHex0x(ip) {
    while(true){
    if (ip.substring(0, 1) == '0') {
        ip = ip.substring(1)
        continue
    }else{
        break;
    }
    }
    return ip
}




function convertFullIP(ip_string) {
    ip_string = ip_string.replace(/^:|:$/g, '');

    var ipv6 = ip_string.split(':');

    for (var i = 0; i < ipv6.length; i++) {
        var hex = ipv6[i];
        if (hex != "") {
            // normalize leading zeros
            ipv6[i] = ("0000" + hex).substr(-4);
        }
        else {
            // normalize grouped zeros ::
            hex = [];
            for (var j = ipv6.length; j <= 8; j++) {
                hex.push('0000');
            }
            ipv6[i] = hex.join(':');
        }
    }

    return ipv6.join(':');
}
function renderValues() {
    var ip_string = document.getElementById("ip").value

    if (checkIPV6(ip_string)) {
        show();
        document.getElementById("error").innerHTML = null
        //หารูปแบบเต็มของ ip
        var ipfull = convertFullIP(ip_string)
        var prefix = parseInt(document.getElementById("prefix").value)
        console.log(ipfull + "/" + prefix)
        document.getElementById("ipAddress").innerHTML = ip_string + "/" + prefix

        //หา NetID
        var ip6 = parseIp6(ipfull);
        var network = ip6toString(ip6mask(ip6, prefix))
        console.log(network)
        document.getElementById("network").innerHTML = network

        //prefix
        document.getElementById("prefixLength").innerHTML = prefix

        //ทำการหา Range Network
        var ipv6toBi = convertIPtoBi(ipfull)
        var strIpv6toBi = ipv6toBi.join("").toString()
        var strRangeNetwork = calculateRangeNetwork(strIpv6toBi, prefix)
        var hextobinStart = calculateRangeNetworkToHex(strRangeNetwork)
        var strRangeSubnet = calculateRangeSubnet(strIpv6toBi, prefix)
        var hextobinEnd = calculateRangeNetworkToHex(strRangeSubnet)
        document.getElementById("networkLengthStart").innerHTML = hextobinStart.join(':') + " -"
        document.getElementById("networkLengthEnd").innerHTML = hextobinEnd.join(':')

        //จำนวน Host ทั้งหมด total ip
        var n = 128 - prefix;
        var totolIP = BigNumber(2).power((n)).toString()
        console.log("totalIP " + totolIP.toString())
        document.getElementById("totalIP").innerHTML = totolIP.toString()


        //render ipfull
        document.getElementById("fullIP").innerHTML = ipfull

        //fullIPHex
        var ipv6 = ipfull.split(":")
        var fullHexIP = ipv6.join("").toString()
        console.log("FullhexIP " + fullHexIP)
        var convertFull = convertFullHex0x(fullHexIP)
        console.log("convertFull " + convertFull)
        document.getElementById("hexIP").innerHTML = "0x" + convertFull
  

        //ทำการหา integer ip
        var intergerIP = calculateIntegerIP(fullHexIP).toString()
        document.getElementById("integerIP").innerHTML = intergerIP

        //dotted decimal ip
        var ipv6toHex2 = convertIPtoHex2(ipfull)
        var ipv6toDec = convertIPtoDec(ipv6toHex2)
        document.getElementById("dotIP").innerHTML = ipv6toDec.join('.')

        //render การแบ่ง subnet
        runSubnet(ip_string)
        //แสดง ส่วนที่ซ่อนไว้


    } else {
        document.getElementById("error").innerHTML = "IP is not IPV6"
        console.log("IP is not IPV6")
        hide();
    }
}


// check ipv6
function checkIPV6(ip_string) {
    var regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/
    var regex2 = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/

    console.log("regex " + regex.test(ip_string))
    console.log("regex " + regex2.test(ip_string))
    if (!regex.test(ip_string)) {
        return false
    }
    if (!regex2.test(ip_string)) {
        return false
    }
    return true;
    // const components = ip_string.split(":");
    // if (components.length < 2 || components.length > 8)
    //     return false;
    // if (components[0] !== "" || components[1] !== "") {
    //     // Address does not begin with a zero compression ("::")
    //     if (!components[0].match(/^[\da-f]{1,4}/i)) {
    //         // Component must contain 1-4 hex characters
    //         return false;
    //     }
    // }

    // let numberOfZeroCompressions = 0;
    // for (let i = 1; i < components.length; ++i) {
    //     if (components[i] === "") {
    //         // We're inside a zero compression ("::")
    //         ++numberOfZeroCompressions;
    //         if (numberOfZeroCompressions > 1) {
    //             // Zero compression can only occur once in an address
    //             return false;
    //         }
    //         continue;
    //     }
    //     if (!components[i].match(/^[\da-f]{1,4}/i)) {
    //         // Component must contain 1-4 hex characters
    //         return false;
    //     }

    // }
}


// คำนวณหา network
function parseIp6(str) {
    //init
    var ar = new Array;
    for (var i = 0; i < 8; i++)ar[i] = 0;
    //check for trivial IPs
    if (str == "::") return ar;
    //parse
    var sar = str.split(':');
    var slen = sar.length;
    if (slen > 8) slen = 8;
    var j = 0;
    for (var i = 0; i < slen; i++) {
        //this is a "::", switch to end-run mode
        if (i && sar[i] == "") { j = 9 - slen + i; continue; }
        ar[j] = parseInt("0x0" + sar[i]);
        j++;
    }

    return ar;
}

function ip6toString(ar) {
    //init
    var str = "";
    //find longest stretch of zeroes
    var zs = -1, zsf = -1;
    var zl = 0, zlf = 0;
    var md = 0;
    for (var i = 0; i < 8; i++) {
        if (md) {
            if (ar[i] == 0) zl++;
            else md = 0;
        } else {
            if (ar[i] == 0) { zs = i; zl = 1; md = 1; }
        }
        if (zl > 2 && zl > zlf) { zlf = zl; zsf = zs; }
    }
    //print
    for (var i = 0; i < 8; i++) {
        if (i == zsf) {
            str += ":";
            i += zlf - 1;
            if (i >= 7) str += ":";
            continue;
        }
        if (i) str += ":";
        str += ConvertBase.dec2hex(ar[i]);
    }
    return str;
}
function ip6mask(ip, prf) {
    if (typeof (prf) == "number")
        prf = ip6prefixToMask(prf);
    var ip2 = new Array;
    for (var i = 0; i < 8; i++)
        ip2[i] = ip[i] & prf[i];
    return ip2;
}
function ip6prefixToMask(prf) {
    var ar = new Array;
    for (var i = 0; i < 8; i++) {
        if (prf >= 16) ar[i] = 0xffff;
        else switch (prf) {
            case 1: ar[i] = 0x8000; break;
            case 2: ar[i] = 0xc000; break;
            case 3: ar[i] = 0xe000; break;
            case 4: ar[i] = 0xf000; break;
            case 5: ar[i] = 0xf800; break;
            case 6: ar[i] = 0xfc00; break;
            case 7: ar[i] = 0xfe00; break;
            case 8: ar[i] = 0xff00; break;
            case 9: ar[i] = 0xff80; break;
            case 10: ar[i] = 0xffc0; break;
            case 11: ar[i] = 0xffe0; break;
            case 12: ar[i] = 0xfff0; break;
            case 13: ar[i] = 0xfff8; break;
            case 14: ar[i] = 0xfffc; break;
            case 15: ar[i] = 0xfffe; break;
            default: ar[i] = 0; break;
        }
        prf -= 16;
    }
    return ar;
}


//Convert base
var ConvertBase = function (num) {
    return {
        from: function (baseFrom) {
            return {
                to: function (baseTo) {
                    return parseInt(num, baseFrom).toString(baseTo);
                }
            };
        }
    };
};

// binary to decimal
ConvertBase.bin2dec = function (num) {
    return ConvertBase(num).from(2).to(10);
};

// binary to hexadecimal
ConvertBase.bin2hex = function (num) {
    return ConvertBase(num).from(2).to(16);
};

// decimal to binary
ConvertBase.dec2bin = function (num) {
    return ConvertBase(num).from(10).to(2);
};

// decimal to hexadecimal
ConvertBase.dec2hex = function (num) {
    return ConvertBase(num).from(10).to(16);
};

// hexadecimal to binary
ConvertBase.hex2bin = function (num) {
    return ConvertBase(num).from(16).to(2);
};

// hexadecimal to decimal
ConvertBase.hex2dec = function (num) {
    return ConvertBase(num).from(16).to(10);
};

this.ConvertBase = ConvertBase;

//getValue to page Subnet
function getValue(ip, i) {
    var prefix = parseInt(document.getElementById("prefix").value)
    console.log(i)
    console.log(ip)
    var queryString = "?ip=" + ip + "&i=" + i + "&prefix=" + prefix
    // window.location.href = "subnet.html" + queryString;
    window.open("subnet.html" + queryString, "_blank")
}