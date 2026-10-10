const menuData = [
    // Section Bakso
    { id: 'b1', name: 'Bakso Sulawesi', category: 'Bakso', price: 25000, icon: 'fa-bowl-food' },
    { id: 'b2', name: 'Bakso Tempur', category: 'Bakso', price: 28000, icon: 'fa-bowl-food' },
    { id: 'b3', name: 'Bakso Komplit', category: 'Bakso', price: 32000, icon: 'fa-bowl-food' },
    { id: 'b4', name: 'Gorengan Pangsit', category: 'Bakso', price: 10000, icon: 'fa-cookie' },
    { id: 'b5', name: 'Bakso Urat', category: 'Bakso', price: 25000, icon: 'fa-bowl-food' },
    { id: 'b6', name: 'Bakso Telor', category: 'Bakso', price: 27000, icon: 'fa-bowl-food' },
    { id: 'b7', name: 'Indomie', category: 'Bakso', price: 12000, icon: 'fa-bowl-rice' },
    
    // Section Mie Ayam
    { id: 'm1', name: 'Mie Pangsit Doyan', category: 'Mie Ayam', price: 22000, icon: 'fa-utensils' },
    { id: 'm2', name: 'Mie Pangsit Bahagia', category: 'Mie Ayam', price: 25000, icon: 'fa-utensils' },
    { id: 'm3', name: 'Mie Pangsit Bakso', category: 'Mie Ayam', price: 28000, icon: 'fa-utensils' },
    { id: 'm4', name: 'Mie Pangsit Tempur', category: 'Mie Ayam', price: 30000, icon: 'fa-utensils' },
    { id: 'm5', name: 'Mie Pangsit Komplit', category: 'Mie Ayam', price: 35000, icon: 'fa-utensils' },
    { id: 'm6', name: 'Pangsit Rebus', category: 'Mie Ayam', price: 15000, icon: 'fa-dumpling' },

    // Section Tambahan
    { id: 't1', name: 'Es Teh', category: 'Tambahan', price: 5000, icon: 'fa-cup-straw' },
    { id: 't2', name: 'Air Mineral', category: 'Tambahan', price: 5000, icon: 'fa-bottle-water' },
    { id: 't3', name: 'Air Gelas', category: 'Tambahan', price: 2000, icon: 'fa-glass-water' },
    { id: 't4', name: 'Buras', category: 'Tambahan', price: 4000, icon: 'fa-leaf' },
    { id: 't5', name: 'Kopi Komi', category: 'Tambahan', price: 15000, icon: 'fa-mug-hot' },
    { id: 't6', name: 'Non Kopi Komi', category: 'Tambahan', price: 18000, icon: 'fa-mug-saucer' },
    { id: 't7', name: 'Kopi Special Komi', category: 'Tambahan', price: 22000, icon: 'fa-mug-hot' },
    { id: 't8', name: 'Ice Chocolate', category: 'Tambahan', price: 20000, icon: 'fa-glass-water' },
    { id: 't9', name: 'Matcha Komi', category: 'Tambahan', price: 22000, icon: 'fa-cup-straw' },
];

let cart = [];
let currentCategory = 'all';
let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    renderMenuGrid();
    renderCart();
});

function renderMenuGrid() {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = '';

    const filtered = menuData.filter(item => {
        const matchCat = currentCategory === 'all' || item.category === currentCategory;
        const matchSearch = item.name.toLowerCase().includes(currentSearchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-12 text-center text-slate-400">Menu tidak ditemukan</div>`;
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = "bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group";
        card.innerHTML = `
            <div>
                <div class="flex justify-between items-start mb-2">
                    <span class="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">${item.category}</span>
                    <div class="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <i class="fa-solid ${item.icon} text-sm"></i>
                    </div>
                </div>
                <h3 class="font-bold text-slate-800 text-sm mb-1">${item.name}</h3>
                <p class="text-brand-600 font-extrabold text-sm">Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <button onclick="addToCart('${item.id}')" class="mt-4 w-full py-2 bg-slate-100 hover:bg-brand-600 hover:text-white text-slate-700 font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-plus"></i> Tambah
            </button>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.category-btn').forEach(b => b.className = "category-btn px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all shrink-0");
    document.getElementById(`catBtn-${cat}`).className = "category-btn px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-900 text-white transition-all shrink-0";
    renderMenuGrid();
}

function filterMenus() {
    currentSearchQuery = document.getElementById('searchMenu').value;
    renderMenuGrid();
}

function addToCart(id) {
    const prod = menuData.find(m => m.id === id);
    const exist = cart.find(i => i.id === id);
    if (exist) exist.qty++;
    else cart.push({ ...prod, qty: 1 });
    renderCart();
    showToast(`Menambahkan ${prod.name}`);
}

function updateQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }
    renderCart();
}

function renderCart() {
    const list = document.getElementById('cartList');
    const totalItemsCount = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    document.getElementById('cartCountBadge').innerText = `${totalItemsCount} item`;
    document.getElementById('cartTotalPrice').innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="text-center py-12 text-slate-400">
                <i class="fa-solid fa-basket-shopping text-4xl mb-2 text-slate-300"></i>
                <p class="text-sm font-medium">Belum ada menu dipilih</p>
            </div>
        `;
        return;
    }

    list.innerHTML = '';
    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = "pt-3 pb-3 flex justify-between items-center gap-2 border-b border-slate-100 last:border-0";
        div.innerHTML = `
            <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-xs text-slate-800 truncate">${item.name}</h4>
                <p class="text-brand-600 text-xs font-bold">Rp ${(item.price * item.qty).toLocaleString('id-ID')}</p>
            </div>
            <div class="flex items-center bg-slate-100 rounded-lg p-1">
                <button onclick="updateQty('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center bg-white text-slate-600 rounded-md text-xs font-bold shadow-xs"><i class="fa-solid fa-minus text-[10px]"></i></button>
                <span class="w-7 text-center text-xs font-bold">${item.qty}</span>
                <button onclick="updateQty('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center bg-white text-slate-600 rounded-md text-xs font-bold shadow-xs"><i class="fa-solid fa-plus text-[10px]"></i></button>
            </div>
        `;
        list.appendChild(div);
    });
}

function sendToWhatsApp() {
    const noMeja = document.getElementById('inputNoMeja').value.trim();
    const catatan = document.getElementById('inputCatatanGlobal').value.trim();

    if (!noMeja) {
        showToast('Masukkan Nomor Meja / Nama Pelanggan terlebih dahulu!', 'error');
        document.getElementById('inputNoMeja').focus();
        return;
    }

    if (cart.length === 0) {
        showToast('Keranjang pesanan masih kosong!', 'error');
        return;
    }

    let waMessage = `*PESANAN BARU - BAKSO SULAWESI*\n`;
    waMessage += `━━━━━━━━━━━━━━━━━━━\n`;
    waMessage += `📍 *${noMeja}*\n`;
    waMessage += `⏰ Waktu: ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}\n`;
    waMessage += `━━━━━━━━━━━━━━━━━━━\n\n`;
    waMessage += `*Daftar Menu:*\n`;

    let grandTotal = 0;
    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        grandTotal += subtotal;
        waMessage += `${index + 1}. ${item.name} (${item.qty}x) - Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });

    waMessage += `\n📝 *Catatan:* ${catatan || 'Tidak ada'}\n`;
    waMessage += `━━━━━━━━━━━━━━━━━━━\n`;
    waMessage += `💰 *Total Harga: Rp ${grandTotal.toLocaleString('id-ID')}*\n`;

    const encodedMessage = encodeURIComponent(waMessage);
    const targetPhone = '6289570511369';

    const waUrl = `https://api.whatsapp.com/send?phone=${targetPhone}&text=${encodedMessage}`;
    window.open(waUrl, '_blank');

    cart = [];
    document.getElementById('inputNoMeja').value = '';
    document.getElementById('inputCatatanGlobal').value = '';
    renderCart();
    showToast('Pesanan berhasil diarahkan ke WhatsApp Dapur!');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').innerText = message;
    const icon = document.getElementById('toastIcon');
    icon.className = type === 'success' ? "fa-solid fa-circle-check text-emerald-400 text-lg" : "fa-solid fa-circle-exclamation text-rose-400 text-lg";
    
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => toast.classList.add('translate-y-24', 'opacity-0'), 3000);
}