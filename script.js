// HTML dosyasındaki elementleri seçiyoruz
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const messages = document.getElementById("messages");
const menuButton = document.getElementById("menu-button");
const menuList = document.getElementById("menu-list");

// API anahtarımızı bir değişkene atıyoruz
const apiKey = "buraya API anahtarınızı yazın";

// Gönder butonuna tıklandığında çalışacak fonksiyon
function sendMessage() {
    // Kullanıcının girdiği metni alıyoruz
    const userText = userInput.value;
    // Eğer metin boş değilse
    if (userText) {
        // Metni sohbet geçmişine ekliyoruz
        addMessage(userText, "user");
        // Metni Smodin API'sine gönderiyoruz
        fetch(`https://api.smodin.ai/generate?text=${userText}&key=${apiKey}`)
            .then(response => response.json()) // Cevabı JSON formatında alıyoruz
            .then(data => {
                // Cevaptan gelen metni alıyoruz
                const chatgptText = data.text;
                // Metni sohbet geçmişine ekliyoruz
                addMessage(chatgptText, "chatgpt");
            })
            .catch(error => {
                // Eğer bir hata olursa, hatayı konsola yazdırıyoruz
                console.error(error);
            });
        // Metin girişi alanını temizliyoruz
        userInput.value = "";
    }
}

// Sohbet geçmişine mesaj ekleyen fonksiyon
function addMessage(text, sender) {
    // Yeni bir mesaj elementi oluşturuyoruz
    const message = document.createElement("div");
    // Mesajın içeriğini metne eşitliyoruz
    message.textContent = text;
    // Mesajın sınıfını gönderene göre belirliyoruz
    message.className = sender + "-message";
    // Mesajı sohbet geçmişine ekliyoruz
    messages.appendChild(message);
    // Sohbet geçmişini en alta kaydırıyoruz
    messages.scrollTop = messages.scrollHeight;
}

// Menü butonuna tıklandığında çalışacak fonksiyon
function toggleMenu() {
    // Menü listesinin gizli olup olmadığını kontrol ediyoruz
    const hidden = menuList.hidden;
    // Menü listesinin gizlilik durumunu tersine çeviriyoruz
    menuList.hidden = !hidden;
}

// Gönder butonuna tıklama olayını dinliyoruz
sendButton.addEventListener("click", sendMessage);

// Metin girişi alanına klavye olayını dinliyoruz
userInput.addEventListener("keydown", event => {
    // Eğer basılan tuş enter ise
    if (event.key === "Enter") {
        // Gönder fonksiyonunu çağırıyoruz
        sendMessage();
    }
});

// Menü butonuna tıklama olayını dinliyoruz
menuButton.addEventListener("click", toggleMenu);
