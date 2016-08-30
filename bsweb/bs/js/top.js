

    var oNavShop=document.getElementById('nav-ul-shop');
    var oNavShopUl=oNavShop.getElementsByTagName('ul')[0];
    var oFF=true;
    oNavShop.onclick=function () {
        if(oFF){
            oNavShopUl.style.display="block";
            oFF=false;
        }else{
            oNavShopUl.style.display="none";
            oFF=true;
        }

    };
