function goSearch(){
    let kw = document.getElementById("searchInput").value.trim();
    if(kw){
        window.location.href="search.html?kw="+encodeURIComponent(kw);
    }
}
function filterList(){
    alert("筛选功能：你可以后续自行扩展JS逻辑，现在仅做演示");
}