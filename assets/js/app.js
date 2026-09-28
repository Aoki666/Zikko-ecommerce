
const $=(s)=>document.querySelector(s), $$=(s)=>[...document.querySelectorAll(s)];
const KEYS={products:'zikko_products_v1',settings:'zikko_settings_v1'};
const defaults={whatsapp:'+6285186849979',instagram:'https://instagram.com/zikko.co.id',tiktok:'https://tiktok.com/zikko.co.id',facebook:'https://facebook.com/thisoki',pin:'Vigo1234@#'};
let products=JSON.parse(localStorage.getItem(KEYS.products)||'null')||structuredClone(window.ZIKKO_INITIAL_PRODUCTS);
let settings={...defaults,...(JSON.parse(localStorage.getItem(KEYS.settings)||'{}'))};
let filter='All', query='';
function money(n){return Number(n)>0?'Rp '+Number(n).toLocaleString('id-ID'):'Harga belum diatur'}
function save(){localStorage.setItem(KEYS.products,JSON.stringify(products));localStorage.setItem(KEYS.settings,JSON.stringify(settings));}
function waLink(p){const msg=`Halo ZIKKO, saya ingin order parfum:\n\n${p.name}\n${p.size}\n${money(p.price)}\n\nApakah stok masih tersedia?`;return `https://wa.me/${settings.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`}
function card(p){return `<article class="card"><div class="photo"><img src="${p.image}" alt="${p.name.replaceAll('"','&quot;')}" onerror="this.style.display='none';this.nextElementSibling.hidden=false"><div class="missing" hidden>Foto belum tersedia<br><small>${p.image.split('/').pop()}</small></div></div><div class="info"><span class="category">${p.category}</span><h3>${p.name}</h3><div class="size">${p.size||'—'}</div><div class="price">${money(p.price)}</div><button class="order" onclick="window.open('${waLink(p)}','_blank')">Order via WhatsApp</button></div></article>`}
function render(){const arr=products.filter(p=>(filter==='All'||p.category===filter)&&p.name.toLowerCase().includes(query.toLowerCase()));$('#productGrid').innerHTML=arr.map(card).join('');$('#productCount').textContent=`${arr.length} produk`;$('#emptyState').hidden=arr.length!==0;renderAdmin();}
$$('#categoryTabs button').forEach(b=>b.onclick=()=>{$$('#categoryTabs button').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;render()});$('#searchInput').oninput=e=>{query=e.target.value;render()};
function socials(){const links=[['Instagram',settings.instagram],['TikTok',settings.tiktok],['Facebook',settings.facebook]].filter(x=>x[1]);$('#socialLinks').innerHTML=links.map(([n,u])=>`<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('');}
function openAdmin(){ $('#adminModal').classList.add('show'); $('#adminModal').setAttribute('aria-hidden','false'); }
function closeAdmin(){ $('#adminModal').classList.remove('show'); $('#adminModal').setAttribute('aria-hidden','true'); }
$('#adminOpen').onclick=openAdmin; $('#adminClose').onclick=closeAdmin; $('#adminModal').onclick=e=>{if(e.target.id==='adminModal')closeAdmin()};
$('#loginBtn').onclick=()=>{if($('#adminPin').value===settings.pin){$('#loginView').hidden=true;$('#adminView').hidden=false;fillSettings();renderAdmin()}else alert('PIN salah.')};
$('#logoutBtn').onclick=()=>{$('#adminView').hidden=true;$('#loginView').hidden=false;$('#adminPin').value=''};
function renderAdmin(){const el=$('#adminList');if(!el)return;el.innerHTML=products.map(p=>`<div class="admin-row"><div><h4>${p.name}</h4><p>${p.category} · ${p.size} · ${money(p.price)}</p></div><div class="row-actions"><button onclick="editProduct(${p.id})">Edit</button><button class="danger" onclick="deleteProduct(${p.id})">Hapus</button></div></div>`).join('')}
window.editProduct=id=>{const p=products.find(x=>x.id===id);if(!p)return;$('#editId').value=p.id;$('#pName').value=p.name;$('#pCategory').value=p.category;$('#pSize').value=p.size;$('#pPrice').value=p.price||'';$('#pImage').value=p.image;$('#pDesc').value=p.description||'';$('#saveProduct').textContent='Simpan perubahan';$('#cancelEdit').hidden=false;$('#pName').focus()};
window.deleteProduct=id=>{if(confirm('Hapus produk ini?')){products=products.filter(x=>x.id!==id);save();render()}};
function clearForm(){$('#productForm').reset();$('#editId').value='';$('#saveProduct').textContent='Tambah produk';$('#cancelEdit').hidden=true}
$('#cancelEdit').onclick=clearForm;
$('#productForm').onsubmit=e=>{e.preventDefault();const id=Number($('#editId').value);const obj={id:id||Date.now(),name:$('#pName').value.trim(),category:$('#pCategory').value,size:$('#pSize').value.trim()||'—',price:Number($('#pPrice').value||0),image:$('#pImage').value.trim()||'assets/img/parfume/placeholder.jpg',description:$('#pDesc').value.trim()};if(id){products=products.map(p=>p.id===id?obj:p)}else products.unshift(obj);save();clearForm();render()};
$$('[data-admin-tab]').forEach(b=>b.onclick=()=>{$$('[data-admin-tab]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const prod=b.dataset.adminTab==='products';$('#adminProducts').hidden=!prod;$('#adminSettings').hidden=prod;});
function fillSettings(){$('#sWhatsapp').value=settings.whatsapp;$('#sInstagram').value=settings.instagram;$('#sTiktok').value=settings.tiktok;$('#sFacebook').value=settings.facebook;$('#sPin').value=''}
$('#settingsForm').onsubmit=e=>{e.preventDefault();settings.whatsapp=$('#sWhatsapp').value.trim();settings.instagram=$('#sInstagram').value.trim();settings.tiktok=$('#sTiktok').value.trim();settings.facebook=$('#sFacebook').value.trim();if($('#sPin').value.trim())settings.pin=$('#sPin').value.trim();save();socials();alert('Pengaturan tersimpan.')};
$('#resetData').onclick=()=>{if(confirm('Kembalikan katalog ke data awal?')){products=structuredClone(window.ZIKKO_INITIAL_PRODUCTS);save();render()}};
$('#year').textContent=new Date().getFullYear();socials();render();
