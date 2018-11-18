function hide() {
    var x = document.getElementById("hide");
    x.style.display = "none";
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
        //console.log(parseInt(number))

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


function calculateRangeNetworkToHex(ip) {
    var temp = []
    for (var i = 0; i < ip.length; i += 4) {
        var str = ConvertBase.bin2hex(ip[i]) + ConvertBase.bin2hex(ip[i + 1]) + ConvertBase.bin2hex(ip[i + 2]) + ConvertBase.bin2hex(ip[i + 3])
        temp.push(str)
    }
    return temp;
}
function calculateIntegerIP(ip) {
    console.log(ip)
    console.log(ip.length)
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


function full_IPv6(ip_string) {
    // replace ipv4 address if any
    // var ipv4 = ip_string.match(/(.*:)([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$)/);
    // if (ipv4) {
    //     var ip_string = ipv4[1];
    //     ipv4 = ipv4[2].match(/[0-9]+/g);
    //     for (var i = 0;i < 4;i ++) {
    //         var byte = parseInt(ipv4[i],10);
    //         ipv4[i] = ("0" + byte.toString(16)).substr(-2);
    //     }
    //     ip_string += ipv4[0] + ipv4[1] + ':' + ipv4[2] + ipv4[3];
    // }

    // take care of leading and trailing ::
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
    console.log(ipv6.join(':'))
    return ipv6.join(':');

}
function checkIPV6() {
    var ip_string = document.getElementById("ip").value

    if (isIPv6(ip_string)) {
        document.getElementById("error").innerHTML = null
        var ipfull = full_IPv6(ip_string)
        var prefix = parseInt(document.getElementById("prefix").value)
        console.log(ipfull + "/" + prefix)
        document.getElementById("ipAddress").innerHTML = ip_string
        document.getElementById("prefixLength").innerHTML = prefix
        document.getElementById("fullIP").innerHTML = ipfull + "/" + prefix

        var ip6 = parseIp6(ipfull);
        var network = ip6toString(ip6mask(ip6, prefix))
        console.log(network)
        document.getElementById("network").innerHTML = network
        var n = 128 - prefix;
        var totolIP = BigNumber(2).power((n)).toString()
        console.log("totalIP " + totolIP.toString())
        document.getElementById("totalIP").innerHTML = totolIP.toString()



        var ipv6 = ipfull.split(":")
        var hexip = ""
        var dotip = ""
        for (var i = 0; i < ipv6.length; i++) {
            hexip = hexip + ipv6[i]
            dotip = dotip + ConvertBase.hex2bin(ipv6[i]) + "."
        }
        document.getElementById("integerIP").innerHTML = integerIP
        document.getElementById("hexIP").innerHTML = "0x" + hexip
        document.getElementById("dotIP").innerHTML = dotip

        var ipv6toHex2 = convertIPtoHex2(ipfull)
        console.log(ipv6toHex2.join('.'))
        var ipv6toDec = convertIPtoDec(ipv6toHex2)
        console.log(ipv6toDec.join('.'))
        document.getElementById("dotIP").innerHTML = ipv6toDec.join('.')
        var ipv6toBi = convertIPtoBi(ipfull)
        var stripv6toBi = ipv6toBi.join("").toString()

        var strRangeNetwork = calculateRangeNetwork(stripv6toBi, prefix)
        console.log(strRangeNetwork)
        var hextobin1 = calculateRangeNetworkToHex(strRangeNetwork)
        var strRangeSubnet = calculateRangeSubnet(stripv6toBi, prefix)
        var hextobin2 = calculateRangeNetworkToHex(strRangeSubnet)
        document.getElementById("networkLengthStart").innerHTML = hextobin1.join(':') + " -"
        document.getElementById("networkLengthEnd").innerHTML = hextobin2.join(':')


        var intergerIP = calculateIntegerIP(hexip).toString()
        document.getElementById("integerIP").innerHTML = intergerIP
        runSubnet(ip_string)
        var x = document.getElementById("hide");
        x.style.display = "block";

        // let subnets = divideSubnet("2607:5300:60:1234::", 64, 128, 8);
        // console.log(subnets)

    } else {
        document.getElementById("error").innerHTML = "IP is not IPV6"
        console.log("IP is not IPV6")
    }
}


// check ipv6

function isIPv6(ip_string) {
    const components = ip_string.split(":");
    if (components.length < 2 || components.length > 8)
        return false;
    if (components[0] !== "" || components[1] !== "") {
        // Address does not begin with a zero compression ("::")
        if (!components[0].match(/^[\da-f]{1,4}/i)) {
            // Component must contain 1-4 hex characters
            return false;
        }
    }

    let numberOfZeroCompressions = 0;
    for (let i = 1; i < components.length; ++i) {
        if (components[i] === "") {
            // We're inside a zero compression ("::")
            ++numberOfZeroCompressions;
            if (numberOfZeroCompressions > 1) {
                // Zero compression can only occur once in an address
                return false;
            }
            continue;
        }
        if (!components[i].match(/^[\da-f]{1,4}/i)) {
            // Component must contain 1-4 hex characters
            return false;
        }
    }
    return true;
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
        str += dec2hex(ar[i]);
    }
    //   alert("printv6 str="+str+" zsf="+zsf+" zlf="+zlf);
    return str;
}
function ip6mask(ip, prf) {
    if (typeof (prf) == "number")
        prf = ip6prefixToMask(prf);
    var ip2 = new Array;
    for (var i = 0; i < 8; i++)ip2[i] = ip[i] & prf[i];
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
function dec2hex(val) {
    var str = "";
    var minus = false;
    if (val < 0) { minus = true; val *= -1; }
    val = Math.floor(val);
    while (val > 0) {
        var v = val % 16;
        val /= 16; val = Math.floor(val);
        switch (v) {
            case 10: v = "A"; break;
            case 11: v = "B"; break;
            case 12: v = "C"; break;
            case 13: v = "D"; break;
            case 14: v = "E"; break;
            case 15: v = "F"; break;
        }
        str = v + str;
    }
    if (str == "") str = "0";
    if (minus) str = "-" + str;
    return str;
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


    // calculate subnet
// function divideSubnet (addr, mask0, mask1, limit, abbr) {
//         if (!_validate(addr)) {
//             throw new Error('Invalid address: ' + addr);
//         }
//         mask0 *= 1;
//         mask1 *= 1;
//         limit *= 1;
//         mask1 = mask1 || 128;
//         if (mask0 < 1 || mask1 < 1 || mask0 > 128 || mask1 > 128 || mask0 > mask1) {
//             throw new Error('Invalid masks.');
//         }
//         let ret = [];
//         let binAddr = _addr2bin(addr);
//         let binNetPart = binAddr.substr(0, mask0);
//         let binHostPart = '0'.repeat(128 - mask1);
//         let numSubnets = Math.pow(2, mask1 - mask0);
//         for (let i = 0; i < numSubnets; ++i) {
//             if (!!limit && i >= limit) {
//                 break;
//             }
//             let binSubnet = _leftPad(i.toString(2), '0', mask1 - mask0);
//             let binSubAddr = binNetPart + binSubnet + binHostPart;
//             let hexAddr = _bin2addr(binSubAddr);
//             if (!!abbr) {
//                 ret.push(abbreviate(hexAddr));
//             } else {
//                 ret.push(hexAddr);
//             }

//         }
//         // console.log(numSubnets);
//         // console.log(binNetPart, binSubnetPart, binHostPart);
//         // console.log(binNetPart.length, binSubnetPart.length, binHostPart.length);
//         // console.log(ret.length);
//         return ret;
//     };
//     let _validate = function (a) {
//         return /^[a-f0-9\\:]+$/ig.test(a);
//     };
//     let _addr2bin = function (addr) {
//         let nAddr = normalize(addr);
//         let sections = nAddr.split(":");
//         let binAddr = '';
//         for (let section of sections) {
//             binAddr += _leftPad(_hex2bin(section), '0', 16);
//         }
//         return binAddr;
//     };
//     let normalize = function (a) {
//         if (!_validate(a)) {
//             throw new Error('Invalid address: ' + a);
//         }
//         a = a.toLowerCase()

//         let nh = a.split(/\:\:/g);
//         if (nh.length > 2) {
//             throw new Error('Invalid address: ' + a);
//         }

//         let sections = [];
//         if (nh.length == 1) {
//             // full mode
//             sections = a.split(/\:/g);
//             if (sections.length !== 8) {
//                 throw new Error('Invalid address: ' + a);
//             }
//         } else if (nh.length == 2) {
//             // compact mode
//             let n = nh[0];
//             let h = nh[1];
//             let ns = n.split(/\:/g);
//             let hs = h.split(/\:/g);
//             for (let i in ns) {
//                 sections[i] = ns[i];
//             }
//             for (let i = hs.length; i > 0; --i) {
//                 sections[7 - (hs.length - i)] = hs[i - 1];
//             }
//         }
//         for (let i = 0; i < 8; ++i) {
//             if (sections[i] === undefined) {
//                 sections[i] = '0000';
//             }
//             sections[i] = _leftPad(sections[i], '0', 4);
//         }
//         return sections.join(':');
//     };
//     let _leftPad = function (d, p, n) {
//         let padding = p.repeat(n);
//         if (d.length < padding.length) {
//             d = padding.substring(0, padding.length - d.length) + d;
//         }
//         return d;
//     };