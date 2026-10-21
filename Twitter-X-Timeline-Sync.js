// ==UserScript==
// @name X Reading Position & Media Download
// @name:de X Leseposition & Medien-Download
// @description Tracks and syncs your last reading position on Twitter/X, with manual and automatic options. Ideal for keeping track of new posts without losing your place. Uses Tweet ID for precise positioning and supports reposts.
// @description:de Verfolgt und synchronisiert Ihre letzte Leseposition auf Twitter/X, mit manuellen und automatischen Optionen. Perfekt, um neue Beiträge im Blick zu behalten, ohne die aktuelle Position zu verlieren. Verwendet Tweet-ID für präzise Positionierung und Unterstützung für Reposts.
// @description:es Rastrea y sincroniza tu última posición de lectura en Twitter/X, con opciones manuales y automáticas. Ideal para mantener el seguimiento de las publicaciones nuevas sin perder tu posición. Usa ID de Tweet para posicionamiento preciso y soporte para reposts.
// @description:fr Suit et synchronise votre dernière position de lecture sur Twitter/X, avec des options manuelles et automatiques. Idéal pour suivre les nouveaux posts sans perdre votre place actuelle. Utilise l'ID du Tweet pour un positionnement précis et prise en charge des reposts.
// @description:zh-CN 跟踪并同步您在 Twitter/X 上的最后阅读位置，提供手动和自动选项。完美解决在查看新帖子时不丢失当前位置的问题。使用 Tweet ID 进行精确位置定位和对转发的支持。
// @description:ru Отслеживает и синхронизирует вашу последнюю позицию чтения на Twitter/X с ручными и автоматическими опциями. Идеально подходит для просмотра новых постов без потери текущей позиции. Использует ID твита для точного позиционирования и поддержкой репостов.
// @description:ja Twitter/X での最後の読み取り位置を追跡して同期します。手動および自動オプションを提供します。新しい投稿を見逃さずに現在の位置を維持するのに最適です。ツイートIDを使用して正確な位置特定を行い、リポストをサポートします。
// @description:pt-BR Rastrea e sincroniza sua última posição de lectura no Twitter/X, com opções manuais e automáticas. Perfeito para acompanhar novos posts sem perder sua posição atual. Usa ID do Tweet para posicionamiento preciso e suporte a reposts.
// @description:hi Twitter/X पर आपकी अंतिम पठन स्थिति को ट्रैक और सिंक करता है, मैनुअल और स्वचालित विकल्पों के साथ। नई पोस्ट देखते समय अपनी वर्तमान स्थिति को खोए बिना इसे ट्रैक करें। सटीक स्थिति के लिए ट्वीट ID का उपयोग करता है और रीपोस्ट समर्थन के साथ।
// @description:ar يتتبع ويزامن آخر موضع قراءة لك على Twitter/X، مع خيارات يدوية وتلقائية. مثالي لتتبع المشاركات الجديدة دون فقدان موضعك الحالي. يستخدم معرف التغريدة لتحديد الموضع بدقة ودعم إعادة النشر.
// @description:it Traccia e sincronizza la tua ultima posizione di lettura su Twitter/X, con opzioni manuali e automatiche. Ideale per tenere traccia dei nuovi post senza perdere la posizione attuale. Usa l'ID del Tweet per un posizionamento preciso e supporto per i repost.
// @description:ko Twitter/X에서 마지막 읽기 위치를 추적하고 동기화합니다. 수동 및 자동 옵션 포함. 새로운 게시물을 확인하면서 현재 위치를 잃지 않도록 이상적입니다. 트윗 ID를 사용하여 정확한 위치 지정을 하고, 리포스트를 지원합니다。
// @icon https://x.com/favicon.ico
// @namespace https://github.com/Copiis/x-leseposition-medien-download
// @version 2026.10.21c
// @author Copiis
// @license MIT
// @match https://x.com/*
// @connect x.com
// @connect twitter.com
// @connect pbs.twimg.com
// @connect video.twimg.com
// @connect ton.twimg.com
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_registerMenuCommand
// @downloadURL https://raw.githubusercontent.com/Copiis/x-leseposition-medien-download/master/Twitter-X-Timeline-Sync.js
// @updateURL https://raw.githubusercontent.com/Copiis/x-leseposition-medien-download/master/Twitter-X-Timeline-Sync.js
// @description If you find this script useful and would like to support my work, consider making a small donation!
// @description GitHub Sponsors: https://github.com/sponsors/Copiis
// ==/UserScript==
//
(function () {
    'use strict';

    const translations = {
        en: {
            noValidPosition: "❌ No valid reading position to download.",
            alreadyDownloaded: "ℹ️ This reading position has already been downloaded.",
            downloadSuccess: "✅ Reading position downloaded as {fileName}.",
            downloadFailed: "❌ Download failed. The reading position stays saved.",
            downloadClipboardFailed: "❌ Download failed. The reading position stays saved.",
            noPositionFound: "ℹ️ Scroll to set a reading position.",
            scriptError: "❌ Error loading the script.",
            invalidPosition: "❌ Invalid reading position.",
            fileSelectError: "❌ Please select a JSON file.",
            fileReadError: "❌ Error reading the file.",
            fileDialogError: "❌ Error opening file dialog.",
            fileLoadSuccess: "✅ Reading position successfully loaded!",
            buttonsError: "❌ Error displaying buttons.",
            oldPositionWarning: "⚠️ The saved reading position is older than 24 hours. Continue searching?",
            searchPopup: "🔍 Searching for position: @{authorHandler} - Tweet: {tweetId}... Press Space to cancel.",
            searchNoPosition: "❌ No reading position available.",
            searchScrollPrompt: "ℹ️ Please scroll or click the magnifier.",
            tweetIdNotFound: "❌ Tweet ID not found, using closest post by timestamp.",
            postDeletedFallback: "ℹ️ Post possibly deleted - using closest post by timestamp.",
            newPostsDetectionDelayed: "ℹ️ No new posts detected after checking. Please refresh or scroll to load them.",
            autoDownloadToggled: "ℹ️ Auto-download {status}.",
            enabled: "enabled",
            disabled: "disabled",
            fallbackSearchCancelled: "ℹ️ Fallback search cancelled.",
            redirectToHome: "ℹ️ Redirecting to home to search for reading position.",
            saveError: "❌ Save failed after retries. Data may be lost.",
            approximatePosition: "ℹ️ Approximate reading position restored ({strategy}).",
            feedStronglyChanged: "ℹ️ Feed changed significantly — landed at best guess.",
            mediaDownloadNoMedia: "❌ No media found for this post.",
            mediaDownloadFailed: "❌ Media download failed.",
            mediaDownloadSuccess: "✅ Downloaded: {fileName}",
            mediaDownloadInProgress: "Downloading media…"
        },
        de: {
            noValidPosition: "❌ Keine gültige Leseposition zum Downloaden.",
            alreadyDownloaded: "ℹ️ Diese Leseposition wurde bereits heruntergeladen.",
            downloadSuccess: "✅ Leseposition als {fileName} heruntergeladen.",
            downloadFailed: "❌ Download fehlgeschlagen. Die Leseposition bleibt gespeichert.",
            downloadClipboardFailed: "❌ Download fehlgeschlagen. Die Leseposition bleibt gespeichert.",
            noPositionFound: "ℹ️ Scrolle, um eine Leseposition zu setzen.",
            scriptError: "❌ Fehler beim Laden des Skripts.",
            invalidPosition: "❌ Ungültige Leseposition.",
            fileSelectError: "❌ Bitte wähle eine JSON-Datei aus.",
            fileReadError: "❌ Fehler beim Lesen der Datei.",
            fileDialogError: "❌ Fehler beim Öffnen des Datei-Dialogs.",
            fileLoadSuccess: "✅ Leseposition erfolgreich geladen!",
            buttonsError: "❌ Fehler beim Anzeigen der Buttons.",
            oldPositionWarning: "⚠️ Die gespeicherte Leseposition ist älter als 24 Stunden. Suche fortsetzen?",
            searchPopup: "🔍 Suche läuft für Position: @{authorHandler} - Tweet: {tweetId}... Drücke Space zum Abbrechen.",
            searchNoPosition: "❌ Keine Leseposition vorhanden.",
            searchScrollPrompt: "ℹ️ Bitte scrollen oder Lupe klicken.",
            tweetIdNotFound: "❌ Tweet-ID nicht gefunden, verwende zeitlich nächsten Post.",
            postDeletedFallback: "ℹ️ Beitrag möglicherweise gelöscht - verwende zeitlich nächsten Post.",
            newPostsDetectionDelayed: "ℹ️ Keine neuen Beiträge nach Prüfung erkannt. Bitte die Seite aktualisieren oder scrollen, um sie zu laden.",
            autoDownloadToggled: "ℹ️ Automatischer Download {status}.",
            enabled: "aktiviert",
            disabled: "deaktiviert",
            fallbackSearchCancelled: "ℹ️ Fallback-Suche abgebrochen.",
            redirectToHome: "ℹ️ Weiterleitung zur Startseite, um die Leseposition zu suchen.",
            saveError: "❌ Speichern fehlgeschlagen nach Wiederholungen. Daten könnten verloren gehen.",
            approximatePosition: "ℹ️ Ungefähre Leseposition wiederhergestellt ({strategy}).",
            feedStronglyChanged: "ℹ️ Feed stark verändert — beste Schätzung gesetzt.",
            mediaDownloadNoMedia: "❌ Keine Medien für diesen Post gefunden.",
            mediaDownloadFailed: "❌ Medien-Download fehlgeschlagen.",
            mediaDownloadSuccess: "✅ Heruntergeladen: {fileName}",
            mediaDownloadInProgress: "Medien werden heruntergeladen…"
        },

        es: {
            noValidPosition: "❌ No hay posición de lectura válida para descargar.",
            alreadyDownloaded: "ℹ️ Esta posición de lectura ya ha sido descargada.",
            downloadSuccess: "✅ Posición de lectura descargada como {fileName}.",
            downloadFailed: "❌ Falló la descarga. La posición de lectura sigue guardada.",
            downloadClipboardFailed: "❌ Falló la descarga. La posición de lectura sigue guardada.",
            noPositionFound: "ℹ️ Desplázate para establecer una posición de lectura.",
            scriptError: "❌ Error al cargar el script.",
            invalidPosition: "❌ Posición de lectura no válida.",
            fileSelectError: "❌ Por favor, selecciona un archivo JSON.",
            fileReadError: "❌ Error al leer el archivo.",
            fileDialogError: "❌ Error al abrir el diálogo de archivo.",
            fileLoadSuccess: "✅ ¡Posición de lectura cargada con éxito!",
            buttonsError: "❌ Error al mostrar los botones.",
            searchPopup: "🔍 Buscando posición: @{authorHandler} - Tweet: {tweetId}... Presiona ESPACIO para cancelar.",
            searchNoPosition: "❌ No hay posición de lectura disponible.",
            searchScrollPrompt: "ℹ️ Por favor, desplázate o haz clic en la lupa.",
            tweetIdNotFound: "❌ ID de Tweet no encontrado, usando el post más cercano por timestamp.",
            postDeletedFallback: "ℹ️ Publicación posiblemente eliminada - usando el post más cercano por timestamp.",
            newPostsDetectionDelayed: "ℹ️ No se detectaron nuevas publicaciones después de verificar. Por favor, actualiza o desplázate para cargarlas.",
            autoDownloadToggled: "ℹ️ Descarga automática {status}.",
            enabled: "activada",
            disabled: "desactivada",
            fallbackSearchCancelled: "ℹ️ Búsqueda fallback cancelada.",
            saveError: "❌ Falló el guardado después de reintentos. Los datos podrían perderse."
        },

        fr: {
            noValidPosition: "❌ Aucune position de lecture valide à télécharger.",
            alreadyDownloaded: "ℹ️ Cette position de lecture a déjà été téléchargée.",
            downloadSuccess: "✅ Position de lecture téléchargée sous {fileName}.",
            downloadFailed: "❌ Échec du téléchargement. La position de lecture reste enregistrée.",
            downloadClipboardFailed: "❌ Échec du téléchargement. La position de lecture reste enregistrée.",
            noPositionFound: "ℹ️ Faites défiler pour définir une position de lecture.",
            scriptError: "❌ Erreur lors du chargement du script.",
            invalidPosition: "❌ Position de lecture invalide.",
            fileSelectError: "❌ Veuillez sélectionner un fichier JSON.",
            fileReadError: "❌ Erreur lors de la lecture du fichier.",
            fileDialogError: "❌ Erreur lors de l'ouverture de la boîte de dialogue.",
            fileLoadSuccess: "✅ Position de lecture chargée avec succès !",
            buttonsError: "❌ Erreur lors de l'affichage des boutons.",
            searchPopup: "🔍 Recherche en cours pour position: @{authorHandler} - Tweet: {tweetId}... Appuyez sur ESPACE pour annuler.",
            searchNoPosition: "❌ Aucune position de lecture disponible.",
            searchScrollPrompt: "ℹ️ Veuillez faire défiler ou cliquer sur la loupe.",
            tweetIdNotFound: "❌ ID de Tweet non trouvé, utilisant le post le plus proche par timestamp.",
            postDeletedFallback: "ℹ️ Post éventuellement supprimé - utilisant le post le plus proche par timestamp.",
            newPostsDetectionDelayed: "ℹ️ Aucun nouveau post détecté après vérification. Veuillez actualiser ou défiler pour les charger.",
            autoDownloadToggled: "ℹ️ Téléchargement automatique {status}.",
            enabled: "activé",
            disabled: "désactivé",
            fallbackSearchCancelled: "ℹ️ Recherche de fallback annulée.",
            saveError: "❌ Échec de la sauvegarde après réessais. Les données pourraient être perdues."
        },
        'zh-CN': {
            noValidPosition: "❌ 没有有效的阅读位置可以下载。",
            alreadyDownloaded: "ℹ️ 此阅读位置已下载。",
            downloadSuccess: "✅ 阅读位置已下载为 {fileName}。",
            downloadFailed: "❌ 下载失败。阅读位置仍保存在本地。",
            downloadClipboardFailed: "❌ 下载失败。阅读位置仍保存在本地。",
            noPositionFound: "ℹ️ 滚动以设置阅读位置。",
            scriptError: "❌ 加载脚本时出错。",
            invalidPosition: "❌ 无效的阅读位置。",
            fileSelectError: "❌ 请选择一个 JSON 文件。",
            fileReadError: "❌ 读取文件时出错。",
            fileDialogError: "❌ 打开文件对话框时出错。",
            fileLoadSuccess: "✅ 阅读位置加载成功！",
            buttonsError: "❌ 显示按钮时出错。",
            searchPopup: "🔍 正在搜索位置: @{authorHandler} - Tweet: {tweetId}... 按空格键取消。",
            searchNoPosition: "❌ 没有可用的阅读位置。",
            searchScrollPrompt: "ℹ️ 请滚动或点击放大镜。",
            tweetIdNotFound: "❌ 未找到推文ID，使用时间戳最近的帖子。",
            postDeletedFallback: "ℹ️ 帖子可能已删除 - 使用时间戳最近的帖子。",
            newPostsDetectionDelayed: "ℹ️ 检查后未检测到新帖子。请刷新或滚动以加载它们。",
            autoDownloadToggled: "ℹ️ 自动下载 {status}。",
            enabled: "启用",
            disabled: "禁用",
            fallbackSearchCancelled: "ℹ️ Fallback搜索已取消。",
            saveError: "❌ 重试后保存失败。数据可能丢失。"
        },
        ru: {
            noValidPosition: "❌ Нет действительной позиции чтения для загрузки.",
            alreadyDownloaded: "ℹ️ Эта позиция чтения уже была загружена.",
            downloadSuccess: "✅ Позиция чтения загружена как {fileName}.",
            downloadFailed: "❌ Не удалось скачать. Позиция чтения остаётся сохранённой.",
            downloadClipboardFailed: "❌ Не удалось скачать. Позиция чтения остаётся сохранённой.",
            noPositionFound: "ℹ️ Прокрутите, чтобы установить позицию чтения.",
            scriptError: "❌ Ошибка при загрузке скрипта.",
            invalidPosition: "❌ Недействительная позиция чтения.",
            fileSelectError: "❌ Пожалуйста, выберите файл JSON.",
            fileReadError: "❌ Ошибка при чтении файла.",
            fileDialogError: "❌ Ошибка при открытии диалогового окна.",
            fileLoadSuccess: "✅ Позиция чтения успешно загружена!",
            buttonsError: "❌ Ошибка при отображении кнопок.",
            searchPopup: "🔍 Поиск позиции: @{authorHandler} - Tweet: {tweetId}... Нажмите ПРОБЕЛ для отмены.",
            searchNoPosition: "❌ Позиция чтения недоступна.",
            searchScrollPrompt: "ℹ️ Прокрутите или нажмите на лупу.",
            tweetIdNotFound: "❌ ID твита не найден, использование ближайшего поста по временной метке.",
            postDeletedFallback: "ℹ️ Пост возможно удален - использование ближайшего поста по временной метке.",
            newPostsDetectionDelayed: "ℹ️ После проверки новых постов не обнаружено. Пожалуйста, обновите или прокрутите, чтобы загрузить их.",
            autoDownloadToggled: "ℹ️ Автоматическая загрузка {status}.",
            enabled: "включено",
            disabled: "отключено",
            fallbackSearchCancelled: "ℹ️ Fallback-поиск отменен.",
            saveError: "❌ Сохранение не удалось после повторных попыток. Данные могут быть потеряны."
        },
        ja: {
            noValidPosition: "❌ ダウンロードする有効な読み取り位置がありません。",
            alreadyDownloaded: "ℹ️ この読み取り位置はすでにダウンロードされています。",
            downloadSuccess: "✅ 読み取り位置が{fileName}としてダウンロードされました。",
            downloadFailed: "❌ ダウンロードに失敗しました。読み取り位置は保存されたままです。",
            downloadClipboardFailed: "❌ ダウンロードに失敗しました。読み取り位置は保存されたままです。",
            noPositionFound: "ℹ️ スクロールして読み取り位置を設定してください。",
            scriptError: "❌ スクリプトの読み込み中にエラーが発生しました。",
            invalidPosition: "❌ 無効な読み取り位置です。",
            fileSelectError: "❌ JSONファイルを選択してください。",
            fileReadError: "❌ ファイルの読み込み中にエラーが発生しました。",
            fileDialogError: "❌ ファイルダイアログのオープン中にエラーが発生しました。",
            fileLoadSuccess: "✅ 読み取り位置が正常にロードされました！",
            buttonsError: "❌ ボタンの表示中にエラーが発生しました。",
            searchPopup: "🔍 位置を検索中: @{authorHandler} - Tweet: {tweetId}... スペースキーを押してキャンセル。",
            searchNoPosition: "❌ 読み取り位置がありません。",
            searchScrollPrompt: "ℹ️ スクロールするか、虫眼鏡をクリックしてください。",
            tweetIdNotFound: "❌ ツイートIDが見つかりません。タイムスタンプに最も近い投稿を使用します。",
            postDeletedFallback: "ℹ️ 投稿が削除された可能性 - タイムスタンプに最も近い投稿を使用。",
            newPostsDetectionDelayed: "ℹ️ チェック後、新しい投稿は検出されませんでした。ページを更新するかスクロールしてロードしてください。",
            autoDownloadToggled: "ℹ️ 自動ダウンロード {status}。",
            enabled: "有効",
            disabled: "無効",
            fallbackSearchCancelled: "ℹ️ Fallback検索がキャンセルされました。",
            saveError: "❌ リトライ後、保存に失敗しました。データが失われる可能性があります。"
        },
                'pt-BR': {
            noValidPosition: "❌ Nenhuma posição de leitura válida para download.",
            alreadyDownloaded: "ℹ️ Esta posição de leitura já foi baixada.",
            downloadSuccess: "✅ Posição de leitura baixada como {fileName}.",
            downloadFailed: "❌ Falha no download. A posição de leitura permanece salva.",
            downloadClipboardFailed: "❌ Falha no download. A posição de leitura permanece salva.",
            noPositionFound: "ℹ️ Role para definir uma posição de leitura.",
            scriptError: "❌ Erro ao carregar o script.",
            invalidPosition: "❌ Posição de leitura inválida.",
            fileSelectError: "❌ Por favor, selecione um arquivo JSON.",
            fileReadError: "❌ Erro ao ler o arquivo.",
            fileDialogError: "❌ Erro ao abrir o diálogo de arquivo.",
            fileLoadSuccess: "✅ Posição de leitura carregada com sucesso!",
            buttonsError: "❌ Erro ao exibir os botões.",
            searchPopup: "🔍 Pesquisando posição: @{authorHandler} - Tweet: {tweetId}... Pressione ESPAÇO para cancelar.",
            searchNoPosition: "❌ Nenhuma posição de leitura disponível.",
            searchScrollPrompt: "ℹ️ Role ou clique na lupa.",
            tweetIdNotFound: "❌ ID do Tweet não encontrado, usando o post mais próximo por timestamp.",
            postDeletedFallback: "ℹ️ Post possivelmente deletado - usando o post mais próximo por timestamp.",
            newPostsDetectionDelayed: "ℹ️ Nenhum novo post detectado após verificação. Por favor, atualize ou role para carregá-los.",
            autoDownloadToggled: "ℹ️ Download automático {status}.",
            enabled: "ativado",
            disabled: "desativado",
            fallbackSearchCancelled: "ℹ️ Pesquisa fallback cancelada.",
            saveError: "❌ Falha no salvamento após tentativas. Os dados podem ser perdidos."
        },
        hi: {
            noValidPosition: "❌ डाउनलोड करने के लिए कोई वैध पढ़ने की स्थिति नहीं है।",
            alreadyDownloaded: "ℹ️ यह पढ़ने की स्थिति पहले ही डाउनलोड की जा चुकी है।",
            downloadSuccess: "✅ पढ़ने की स्थिति {fileName} के रूप में डाउनलोड की गई।",
            downloadFailed: "❌ डाउनलोड विफल। पढ़ने की स्थिति सहेजी हुई रहती है।",
            downloadClipboardFailed: "❌ डाउनलोड विफल। पढ़ने की स्थिति सहेजी हुई रहती है।",
            noPositionFound: "ℹ️ पढ़ने की स्थिति सेट करने के लिए स्क्रॉल करें।",
            scriptError: "❌ स्क्रिप्ट लोड करने में त्रुटि।",
            invalidPosition: "❌ अमान्य पढ़ने की स्थिति।",
            fileSelectError: "❌ कृपया एक JSON फ़ाइल चुनें।",
            fileReadError: "❌ फ़ाइल पढ़ने में त्रुटि।",
            fileDialogError: "❌ फ़ाइल डायलॉग खोलने में त्रुटि।",
            fileLoadSuccess: "✅ पढ़ने की स्थिति सफलतापूर्वक लोड की गई!",
            buttonsError: "❌ बटनों को प्रदर्शित करने में त्रुटि।",
            searchPopup: "🔍 खोज चल रही है स्थिति के लिए: @{authorHandler} - Tweet: {tweetId}... रद्द करने के लिए स्पेस दबाएं।",
            searchNoPosition: "❌ कोई पढ़ने की स्थिति उपलब्ध नहीं है।",
            searchScrollPrompt: "ℹ️ कृपया स्क्रॉल करें या मैग्नीफायर पर क्लिक करें।",
            tweetIdNotFound: "❌ ट्वीट ID नहीं मिला, टाइमस्टैम्प के सबसे नजदीकी पोस्ट का उपयोग कर रहा है।",
            postDeletedFallback: "ℹ️ पोस्ट संभवतः हटा दी गई - टाइमस्टैम्प के सबसे नजदीकी पोस्ट का उपयोग कर रहा है।",
            newPostsDetectionDelayed: "ℹ️ जाँच के बाद कोई नए पोस्ट नहीं पाए गए। कृपया पेज रिफ्रेश करें या स्क्रॉल करें ताकि उन्हें लोड किया जा सके।",
            autoDownloadToggled: "ℹ️ स्वचालित डाउनलोड {status}।",
            enabled: "सक्षम",
            disabled: "अक्षम",
            fallbackSearchCancelled: "ℹ️ Fallback खोज रद्द की गई।",
            saveError: "❌ पुन: प्रयासों के बाद सहेजने में विफल। डेटा खो सकता है।"
        },
        ar: {
            noValidPosition: "❌ لا توجد مواضع قراءة صالحة للتحميل.",
            alreadyDownloaded: "ℹ️ تم تحميل موضع القراءة هذا بالفعل.",
            downloadSuccess: "✅ تم تحميل موضع القراءة باسم {fileName}.",
            downloadFailed: "❌ فشل التحميل. بقي موضع القراءة محفوظًا.",
            downloadClipboardFailed: "❌ فشل التحميل. بقي موضع القراءة محفوظًا.",
            noPositionFound: "ℹ️ قم بالتمرير لتحديد موضع القراءة.",
            scriptError: "❌ خطأ أثناء تحميل السكربت.",
            invalidPosition: "❌ موضع قراءة غير صالح.",
            fileSelectError: "❌ يرجى اختيار ملف JSON.",
            fileReadError: "❌ خطأ أثناء قراءة الملف.",
            fileDialogError: "❌ خطأ أثناء فتح حوار الملف.",
            fileLoadSuccess: "✅ تم تحميل موضع القراءة بنجاح!",
            buttonsError: "❌ خطأ أثناء عرض الأزرار.",
            searchPopup: "🔍 جارٍ البحث عن الموقع: @{authorHandler} - Tweet: {tweetId}... اضغط على مفتاح المسافة للإلغاء.",
            searchNoPosition: "❌ لا يوجد موضع قراءة متاح.",
            searchScrollPrompt: "ℹ️ يرجى التمرير أو النقر على العدسة المكبرة.",
            tweetIdNotFound: "❌ معرف التغريدة غير موجود، باستخدام المنشور الأقرب حسب الطابع الزمني.",
            postDeletedFallback: "ℹ️ المنشور ربما محذوف - باستخدام المنشور الأقرب حسب الطابع الزمني.",
            newPostsDetectionDelayed: "ℹ️ لم يتم الكشف عن مشاركات جديدة بعد التحقق. يرجى تحديث الصفحة أو التمرير لتحميلها.",
            autoDownloadToggled: "ℹ️ التحميل التلقائي {status}.",
            enabled: "مفعل",
            disabled: "معطل",
            fallbackSearchCancelled: "ℹ️ بحث Fallback ملغى.",
            saveError: "❌ فشل الحفظ بعد المحاولات. قد تفقد البيانات."
        },
        it: {
            noValidPosition: "❌ Nessuna posizione di lettura valida da scaricare.",
            alreadyDownloaded: "ℹ️ Questa posizione di lettura è già stata scaricata.",
            downloadSuccess: "✅ Posizione di lettura scaricata come {fileName}.",
            downloadFailed: "❌ Download fallito. La posizione di lettura resta salvata.",
            downloadClipboardFailed: "❌ Download fallito. La posizione di lettura resta salvata.",
            noPositionFound: "ℹ️ Scorri per impostare una posizione di lettura.",
            scriptError: "❌ Errore durante il caricamento dello script.",
            invalidPosition: "❌ Posizione di lettura non valida.",
            fileSelectError: "❌ Seleziona un file JSON.",
            fileReadError: "❌ Errore durante la lettura del file.",
            fileDialogError: "❌ Errore durante l'apertura della finestra di dialogo.",
            fileLoadSuccess: "✅ Posizione di lettura caricata con successo!",
            buttonsError: "❌ Errore durante la visualizzazione dei pulsanti.",
            searchPopup: "🔍 Ricerca in corso per posizione: @{authorHandler} - Tweet: {tweetId}... Premi SPAZIO per annullare.",
            searchNoPosition: "❌ Nessuna posizione di lettura disponibile.",
            searchScrollPrompt: "ℹ️ Scorri o fai clic sulla lente d'ingrandimento.",
            tweetIdNotFound: "❌ ID del Tweet non trovato, utilizzo del post più vicino per timestamp.",
            postDeletedFallback: "ℹ️ Post possibilmente eliminato - utilizzo del post più vicino per timestamp.",
            newPostsDetectionDelayed: "ℹ️ Nessun nuovo post rilevato dopo il controllo. Per favore aggiorna o scorri per caricarli.",
            autoDownloadToggled: "ℹ️ Download automatico {status}.",
            enabled: "abilitato",
            disabled: "disabilitato",
            fallbackSearchCancelled: "ℹ️ Ricerca fallback annullata.",
            saveError: "❌ Salvataggio fallito dopo i tentativi. I dati potrebbero essere persi."
        },
        ko: {
            noValidPosition: "❌ 다운로드할 유효한 읽기 위치가 없습니다.",
            alreadyDownloaded: "ℹ️ 이 읽기 위치는 이미 다운로드되었습니다.",
            downloadSuccess: "✅ 읽기 위치가 {fileName}으로 다운로드되었습니다.",
            downloadFailed: "❌ 다운로드 실패. 읽기 위치는 저장된 상태로 남습니다.",
            downloadClipboardFailed: "❌ 다운로드 실패. 읽기 위치는 저장된 상태로 남습니다.",
            noPositionFound: "ℹ️ 읽기 위치를 설정하려면 스크롤하세요.",
            scriptError: "❌ 스크립트 로드 중 오류가 발생했습니다.",
            invalidPosition: "❌ 유효하지 않은 읽기 위치입니다.",
            fileSelectError: "❌ JSON 파일을 선택하세요.",
            fileReadError: "❌ 파일 읽기 중 오류가 발생했습니다.",
            fileDialogError: "❌ 파일 대화 상자를 여는 중 오류가 발생했습니다.",
            fileLoadSuccess: "✅ 읽기 위치가 성공적으로 로드되었습니다!",
            buttonsError: "❌ 버튼 표시 중 오류가 발생했습니다.",
            searchPopup: "🔍 위치 검색 중: @{authorHandler} - Tweet: {tweetId}... 취소하려면 스페이스바를 누르세요.",
            searchNoPosition: "❌ 사용 가능한 읽기 위치가 없습니다.",
            searchScrollPrompt: "ℹ️ 스크롤하거나 돋보기를 클릭하세요.",
            tweetIdNotFound: "❌ 트윗 ID를 찾을 수 없습니다. 타임스탬프에 가장 가까운 게시물을 사용합니다.",
            postDeletedFallback: "ℹ️ 게시물이 삭제되었을 수 있음 - 타임스탬프에 가장 가까운 게시물을 사용.",
            newPostsDetectionDelayed: "ℹ️ 확인 후 새로운 게시물이 감지되지 않았습니다. 페이지를 새로 고침하거나 스크롤하여 로드하세요.",
            autoDownloadToggled: "ℹ️ 자동 다운로드 {status}。",
            enabled: "활성화됨",
            disabled: "비활성화됨",
            fallbackSearchCancelled: "ℹ️ Fallback 검색이 취소되었습니다。",
            saveError: "❌ 재시도 후 저장 실패. 데이터가 손실될 수 있습니다."
        }
    };

        function getUserLanguage() {
        const lang = (navigator.language || navigator.languages[0] || 'en').toLowerCase();
        const langCode = lang.split('-')[0];
        return Object.keys(translations).find(key => key.toLowerCase().startsWith(langCode)) || 'en';
    }

    function getTranslatedMessage(key, lang, params = {}) {
        const translation = translations[lang] || translations['en'];
        let message = translation[key] || translations['en'][key] || key;
        Object.keys(params).forEach(param => {
            message = message.replace(`{${param}}`, params[param]);
        });
        return message;
    }

    // =====================================================
    // Lesestelle — ein Ablauf
    // idle: mitlesen. pill: neue Posts laden. seek: gespeicherte Stelle suchen, markieren und auf die Lesezeile rücken.
    // Nur der Reiter „Folge ich“. „Für dich“ bleibt auf x.com/home und wird ignoriert.
    // Eine laufende Suche bricht die Pille nicht ab. Space oder das Mausrad bricht sie ab.
    // =====================================================

    const DEBUG = false;
    function log(category, ...args) {
        console.log('[' + category + ']', ...args);
    }
    function debugLog(category, ...args) {
        if (DEBUG) console.log('[' + category + ']', ...args);
    }

    function debounce(fn, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    }

    const AT_TOP_PX = 16;
    const NEAR_TOP_PX = 100;
    const READING_LINE_PX = 175;
    const ALIGN_TOLERANCE_PX = 35;
    const PILL_WATCH_MS = 20000;
    const PILL_RETRY_MS = 2500;
    const PILL_MAX_CLICKS = 3;
    const SEARCH_MAX_STEPS = 800;
    const SEARCH_JUMP_VH = 0.85;
    const FINE_STEP_PX = 280;
    // Durch schon geladene Beiträge nicht warten. Am geladenen Ende auf Nachladen warten.
    const JUMP_FOLLOW_MS = 160;
    const LOAD_WAIT_MS = 1500;
    const CLOSE_LOAD_WAIT_MS = 400;
    const JUMP_GAP_MS = 40;
    const EMPTY_WAITS_MAX = 8;
    const NEAR_MS = 90 * 60 * 1000;
    const NEWER_SLACK_MS = 60 * 1000;
    // Feinschritte erst, wenn der sichtbare Rand nah an der Lesestelle ist.
    const NEAR_ZONE_MS = 30 * 60 * 1000;
    const MAP_MAX = 2500;
    const HISTORY_MAX = 500;
    const REPOST_LOG_MAX = 500;
    const SCROLL_DEAD_PX = 8;
    // Hochscrollen bleibt ein kurzes Stück gültig, auch wenn der Feed die Position danach nach unten schiebt.
    const UP_INTENT_MS = 1600;
    const UP_RECHECK_MS = [400, 1000, 1500];
    const DOWN_WHEEL_CANCEL_PX = 80;
    const SMALL_SVG_MAX = 22;
    const IMPORT_FILE_MAX_BYTES = 2 * 1024 * 1024;
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    // Nach langem Wegsein ist die virtuelle Timeline verzogen. Erst neu laden, dann suchen.
    const STALE_AWAY_MS = 10 * 60 * 1000;
    const REFRESH_SEEK_KEY = 'xTimelineSeekAfterRefresh';

    const STORAGE_KEY = (account) => 'lastReadPost_' + account;
    const HISTORY_KEY = (account) => 'postHistory_' + account;
    const REPOST_LOG_KEY = (account) => 'repostLog_' + account;
    const TIMELINE_MAP_KEY = (account) => 'timelineMap_' + account;
    const AUTO_DOWNLOAD_KEY = 'autoDownloadEnabled';
    const MAX_DOWNLOADED_POSTS = 2000;

    const EXTRA = {
        de: {
            needFollowing: 'ℹ️ Bitte den Reiter „Folge ich“ wählen.',
            searchCancelled: 'ℹ️ Suche abgebrochen.'
        },
        en: {
            needFollowing: 'ℹ️ Switch to the Following tab.',
            searchCancelled: 'ℹ️ Search cancelled.'
        }
    };

    function userText(key, params = {}) {
        const lang = getUserLanguage();
        const extra = (EXTRA[lang] && EXTRA[lang][key]) || EXTRA.en[key];
        if (extra) {
            let message = extra;
            Object.keys(params).forEach((param) => {
                message = message.replace('{' + param + '}', params[param]);
            });
            return message;
        }
        return getTranslatedMessage(key, lang, params);
    }

    function showPopup(messageKey, duration = 5000, params = {}) {
        const message = userText(messageKey, params);
        const fadeDuration = 1000;
        const localPopup = document.createElement('div');
        Object.assign(localPopup.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            boxShadow: '0 0 10px rgba(246, 146, 25, 0.8)',
            zIndex: '10000',
            maxWidth: '500px',
            whiteSpace: 'pre-wrap',
            transition: 'opacity ' + (fadeDuration / 1000) + 's ease',
            opacity: '1'
        });
        localPopup.textContent = message;
        if (!document.body) return;
        document.body.appendChild(localPopup);
        setTimeout(() => {
            localPopup.style.opacity = '0';
            setTimeout(() => {
                if (localPopup.parentNode) localPopup.parentNode.removeChild(localPopup);
            }, fadeDuration + 200);
        }, duration || 5000);
    }

    // ---------- reine Entscheidungen ----------

    function tweetIdMs(tweetId) {
        if (!tweetId) return null;
        try {
            return Number((BigInt(tweetId) >> 22n) + 1288834974657n);
        } catch (e) {
            return null;
        }
    }

    function bookmarkTargetMs(bm) {
        if (!bm || !bm.tweetId) return null;
        if (bm.isRepost) {
            const parsed = Date.parse(bm.readAt || bm.timestamp || '');
            if (Number.isFinite(parsed)) return parsed;
        }
        const fromId = tweetIdMs(bm.tweetId);
        if (fromId !== null) return fromId;
        const parsed = Date.parse(bm.timestamp || '');
        return Number.isFinite(parsed) ? parsed : null;
    }

    function getComparisonTimestamp(postData) {
        if (!postData) return null;
        return postData.isRepost
            ? (postData.readAt || postData.timestamp || null)
            : (postData.timestamp || null);
    }

    function isCandidateNewer(candidate, current) {
        if (!current || !current.tweetId) return true;
        if (!candidate || !candidate.tweetId) return false;
        const candText = String(candidate.tweetId);
        const currText = String(current.tweetId);
        if (!/^\d{1,25}$/.test(candText) || !/^\d{1,25}$/.test(currText)) return false;
        let candId;
        let currId;
        try {
            candId = BigInt(candText);
            currId = BigInt(currText);
        } catch (e) {
            return false;
        }
        if (candId > currId) return true;
        const candIsRep = !!candidate.isRepost;
        const currIsRep = !!current.isRepost;
        if (candIsRep === currIsRep) {
            const candT = getComparisonTimestamp(candidate);
            const currT = getComparisonTimestamp(current);
            if (candT && currT) return new Date(candT).getTime() > new Date(currT).getTime();
            return false;
        }
        if (candIsRep && !currIsRep) return true;
        return false;
    }

    function normalizeHomeTabLabel(text) {
        return (text || '').replace(/\s+/g, ' ').trim().toLowerCase();
    }

    const FOLLOWING_TAB_LABELS = new Set([
        'folge ich', 'following', 'siguiendo', 'abonnements', 'seguindo', 'seguiti',
        'フォロー中', 'подписки', '正在关注', '팔로잉', 'volgend', 'följer', 'følger'
    ]);
    const FOR_YOU_TAB_LABELS = new Set([
        'für dich', 'for you', 'para ti', 'pour vous', 'para você', 'per te',
        'おすすめ', 'для вас', '为你推荐', '추천', 'voor jou', 'för dig', 'til dig'
    ]);

    function tabKind(label) {
        if (FOLLOWING_TAB_LABELS.has(label)) return 'following';
        if (FOR_YOU_TAB_LABELS.has(label)) return 'for-you';
        return '';
    }

    function medianNumber(values) {
        if (!values.length) return null;
        const sorted = values.slice().sort((a, b) => a - b);
        return sorted[Math.floor(sorted.length / 2)];
    }

    function windowReachedBookmark(visibleOriginalTimes, bm) {
        const target = bookmarkTargetMs(bm);
        if (target === null) return false;
        const median = medianNumber(visibleOriginalTimes);
        if (median === null) return false;
        return median <= target;
    }

    // ---------- Account ----------

    let cachedUserHandle = null;

    function isPlausibleUserHandle(handle) {
        return !!handle &&
            handle !== 'unknown' &&
            /^[a-zA-Z0-9_]{1,15}$/.test(handle) &&
            !['i', 'home', 'explore', 'messages', 'notifications', 'settings', 'search'].includes(handle);
    }

    function readUserHandleFromNav() {
        const navLink = document.querySelector("a[data-testid='AppTabBar_Profile_Link'][href^='/']");
        if (!navLink) return null;
        const href = navLink.getAttribute('href') || '';
        const match = href.match(/^\/([^/]+)/);
        return match ? match[1] : null;
    }

    function rememberUserHandle(handle) {
        if (!isPlausibleUserHandle(handle)) return;
        cachedUserHandle = handle;
        try { localStorage.setItem('currentUserHandle', handle); } catch (e) { /* leer */ }
    }

    async function getCurrentUserHandle() {
        const fromNav = readUserHandleFromNav();
        if (isPlausibleUserHandle(fromNav)) {
            rememberUserHandle(fromNav);
            return fromNav;
        }
        if (isPlausibleUserHandle(cachedUserHandle)) return cachedUserHandle;
        try {
            const stored = localStorage.getItem('currentUserHandle');
            if (isPlausibleUserHandle(stored)) {
                cachedUserHandle = stored;
                return stored;
            }
        } catch (e) { /* leer */ }
        return new Promise((resolve) => {
            let handle = null;
            const navContainer = document.querySelector("nav[role='navigation']") ||
                document.querySelector('header') ||
                document.documentElement;
            const observer = new MutationObserver(() => {
                handle = readUserHandleFromNav();
                if (isPlausibleUserHandle(handle)) {
                    rememberUserHandle(handle);
                    observer.disconnect();
                    resolve(handle);
                }
            });
            observer.observe(navContainer, { childList: true, subtree: true });
            setTimeout(() => {
                if (isPlausibleUserHandle(handle)) return;
                observer.disconnect();
                log('Init', 'Benutzerhandle nicht ermittelt');
                resolve('unknown');
            }, 3000);
        });
    }

    // ---------- DOM der Beiträge ----------

    const repostCache = new WeakMap();

    function detectRepost(postElement) {
        const repostPathPattern = /M4\.75 3\.79l4\.603.*zm11\.5 2\.71H11V4h5\.25|repost-arrow|repost-icon/i;
        const repostTextPattern = /\b(repost(?:ed|et)?|hat repostet|retweeté|retwittato|リポストしました|перепостил|republicou|إعادة نشر|repostado|리트윗|reposted by|repostet by|retweeted by)\b/i;
        const socialContext = postElement.querySelector('span[data-testid="socialContext"]');
        if (socialContext) {
            if (repostTextPattern.test(socialContext.textContent || '')) return true;
            const path = socialContext.querySelector('path');
            if (path && repostPathPattern.test(path.getAttribute('d') || '')) return true;
        }
        const svgs = postElement.querySelectorAll('svg');
        const limit = Math.min(svgs.length, 4);
        for (let i = 0; i < limit; i++) {
            const svg = svgs[i];
            const rect = svg.getBoundingClientRect();
            if (rect.height > SMALL_SVG_MAX || rect.width > SMALL_SVG_MAX) continue;
            const path = svg.querySelector('path');
            if (path && repostPathPattern.test(path.getAttribute('d') || '')) return true;
        }
        return false;
    }

    function getPostTweetId(post) {
        if (!post) return null;
        const time = post.querySelector('time');
        const timeLink = time && time.closest("a[href*='/status/']");
        const linkElement = timeLink || post.querySelector("a[href*='/status/']");
        if (!linkElement) return null;
        const href = linkElement.getAttribute('href') || '';
        const match = href.match(/\/status\/(\d+)/);
        return match ? match[1] : null;
    }

    function isRepost(postElement) {
        if (!postElement) return false;
        const tweetId = getPostTweetId(postElement) || '';
        const cached = repostCache.get(postElement);
        if (cached && cached.tweetId === tweetId && (cached.isRepost || Date.now() - cached.negativeAt < 1500)) {
            return cached.isRepost;
        }
        const result = detectRepost(postElement);
        repostCache.set(postElement, {
            tweetId,
            isRepost: result,
            negativeAt: result ? 0 : Date.now()
        });
        return result;
    }

    function getReposterHandler(postElement) {
        if (!postElement) return null;
        const socialContext = postElement.querySelector('span[data-testid="socialContext"]');
        const links = socialContext
            ? socialContext.querySelectorAll("a[href^='/']:not([href*='/status/'])")
            : [];
        for (const link of links) {
            const href = link.getAttribute('href') || '';
            const match = href.match(/^\/([^/?#]+)/);
            if (match && isPlausibleUserHandle(match[1])) return match[1];
        }
        return null;
    }

    function getPostAuthorHandler(post) {
        if (!post) return null;
        const repostFlag = isRepost(post);
        let handlerElement = null;
        if (repostFlag) {
            const innerArticle = post.querySelector('article');
            if (innerArticle) {
                handlerElement = innerArticle.querySelector("a[href^='/']:not([href*='/status/'])");
            }
            if (!handlerElement) {
                const socialContext = post.querySelector('span[data-testid="socialContext"]');
                const allLinks = Array.from(post.querySelectorAll("a[href^='/']:not([href*='/status/'])"));
                handlerElement = allLinks.find((link) => !socialContext || !socialContext.contains(link)) || null;
            }
        } else {
            handlerElement = post.querySelector("a[href^='/']:not([href*='/status/'])");
        }
        if (!handlerElement) return null;
        const href = handlerElement.getAttribute('href') || '';
        const match = href.match(/^\/([^/?#]+)/);
        if (!match) return null;
        const handle = match[1];
        if (!handle || ['i', 'home', 'explore', 'messages', 'notifications'].includes(handle)) return null;
        return /^[a-zA-Z0-9_]{1,15}$/.test(handle) ? handle : null;
    }

    function getPostTimestamp(post) {
        if (!post) return null;
        const timeElement = post.querySelector('time[datetime]');
        return timeElement ? timeElement.getAttribute('datetime') : null;
    }

    function readArticle(postElement) {
        if (!postElement) return null;
        const tweetId = getPostTweetId(postElement);
        const authorHandler = getPostAuthorHandler(postElement);
        if (!tweetId) return null;
        const repostFlag = isRepost(postElement);
        let timestamp = getPostTimestamp(postElement);
        if (!timestamp) {
            const ms = tweetIdMs(tweetId);
            if (ms) timestamp = new Date(ms).toISOString();
        }
        return {
            element: postElement,
            tweetId,
            authorHandler,
            timestamp,
            isRepost: repostFlag,
            readAt: repostFlag ? new Date().toISOString() : (timestamp || null)
        };
    }

    function feedArticles() {
        const column = document.querySelector("[data-testid='primaryColumn']") || document;
        return Array.from(column.querySelectorAll("article[data-testid='tweet']"));
    }

    function findArticle(bm) {
        if (!bm || !bm.tweetId) return null;
        const want = String(bm.tweetId);
        const articles = feedArticles().filter((post) => String(getPostTweetId(post) || '') === want);
        if (!articles.length) return null;
        const vh = window.innerHeight || 800;
        let best = null;
        let bestScore = Infinity;
        for (const post of articles) {
            const author = getPostAuthorHandler(post);
            const repost = isRepost(post);
            let penalty = 0;
            if (bm.authorHandler && author && author !== bm.authorHandler) penalty += 5;
            if (!!repost !== !!bm.isRepost) penalty += 2;
            const rect = post.getBoundingClientRect();
            const off = rect.height < 5 || rect.bottom <= 0 || rect.top >= vh;
            const dist = Math.abs(rect.top - READING_LINE_PX);
            const score = (off ? 100000000 : 0) + penalty * 100000 + dist;
            if (score < bestScore) {
                bestScore = score;
                best = post;
            }
        }
        return best;
    }

    function visibleParsed() {
        const vh = window.innerHeight || 800;
        const list = [];
        for (const post of feedArticles()) {
            const rect = post.getBoundingClientRect();
            if (rect.height < 5 || rect.bottom <= 0 || rect.top >= vh) continue;
            const parsed = readArticle(post);
            if (!parsed) continue;
            parsed.top = rect.top;
            list.push(parsed);
        }
        list.sort((a, b) => a.top - b.top);
        return list;
    }

    function topReadingPost() {
        const vh = window.innerHeight || 800;
        let best = null;
        let bestTop = Infinity;
        let line = null;
        for (const post of feedArticles()) {
            const rect = post.getBoundingClientRect();
            if (rect.height < 5 || rect.bottom <= 40 || rect.top >= vh) continue;
            const top = Math.max(rect.top, 0);
            if (top < bestTop) {
                bestTop = top;
                best = post;
            }
            if (!line && rect.top <= READING_LINE_PX && rect.bottom >= READING_LINE_PX) line = post;
        }
        const chosen = line || best;
        return chosen ? readArticle(chosen) : null;
    }

    function visibleOriginalTimes() {
        const times = [];
        for (const post of visibleParsed()) {
            if (post.isRepost) continue;
            const ms = tweetIdMs(post.tweetId);
            if (ms !== null) times.push(ms);
        }
        return times;
    }

    // ---------- Scroll ----------

    function isWindowScroller(node) {
        return !node || node === document.scrollingElement || node === document.documentElement || node === document.body;
    }

    function feedScroller() {
        if (activeScroller && activeScroller.isConnected) return activeScroller;
        let node = document.querySelector('[data-testid="primaryColumn"]');
        let guard = 0;
        while (node && node !== document.body && guard < 14) {
            let overflow = '';
            try { overflow = getComputedStyle(node).overflowY; } catch (e) { overflow = ''; }
            const scrolls = overflow === 'auto' || overflow === 'scroll' || overflow === 'overlay';
            if (scrolls && node.scrollHeight > node.clientHeight + 80) return node;
            node = node.parentElement;
            guard += 1;
        }
        return document.scrollingElement || document.documentElement;
    }

    function scrollOffset() {
        const scroller = feedScroller();
        if (isWindowScroller(scroller)) return window.scrollY || document.documentElement.scrollTop || 0;
        return scroller.scrollTop || 0;
    }

    function scrollRoomBelow() {
        const scroller = feedScroller();
        const offset = scrollOffset();
        if (isWindowScroller(scroller)) {
            const view = window.innerHeight || 800;
            const height = Math.max(
                document.documentElement.scrollHeight || 0,
                document.body ? document.body.scrollHeight : 0
            );
            return height - offset - view;
        }
        return (scroller.scrollHeight || 0) - offset - (scroller.clientHeight || 0);
    }

    function atTop() {
        return scrollOffset() <= AT_TOP_PX;
    }

    function nearTop() {
        return scrollOffset() <= NEAR_TOP_PX;
    }

    function scrollByDelta(dy) {
        if (!dy) return;
        programmaticUntil = Date.now() + 1500;
        const scroller = feedScroller();
        if (isWindowScroller(scroller)) window.scrollBy(0, dy);
        else scroller.scrollTop += dy;
    }

    function tailKey() {
        const posts = feedArticles();
        const last = posts[posts.length - 1];
        if (!last) return '';
        return (getPostTweetId(last) || '') + (isRepost(last) ? 'r' : '');
    }

    // Der letzte gezeichnete Originalbeitrag liegt schon hinter der Lesestelle.
    // Dann nur eine Bildschirmhöhe, sonst würde der Sprung an den Schwanz vorbeiziehen.
    function renderedTailOlderThanBookmark() {
        const target = bookmarkTargetMs(bookmark);
        if (target === null) return false;
        const posts = feedArticles();
        for (let i = posts.length - 1; i >= 0; i -= 1) {
            const post = posts[i];
            if (isRepost(post)) continue;
            const ms = tweetIdMs(getPostTweetId(post));
            if (ms === null) continue;
            return ms + NEWER_SLACK_MS < target;
        }
        return false;
    }

    function stepTowardBookmark() {
        const vh = window.innerHeight || 800;
        const cap = Math.round(vh * 2);
        let dy;
        if (renderedTailOlderThanBookmark()) {
            dy = Math.round(vh * SEARCH_JUMP_VH);
        } else {
            const posts = feedArticles();
            const last = posts[posts.length - 1];
            if (!last) dy = Math.round(vh * 0.9);
            else {
                const delta = last.getBoundingClientRect().bottom - vh + 8;
                dy = delta > 24 ? delta : Math.round(vh * 0.9);
            }
        }
        if (dy > cap) dy = cap;
        if (dy > 24) scrollByDelta(dy);
        return dy > 0 ? dy : 0;
    }

    function nudgeToward(el) {
        if (!el || !el.isConnected) return 'lost';
        const rect = el.getBoundingClientRect();
        if (rect.height < 5) return 'wait';
        const delta = rect.top - READING_LINE_PX;
        if (Math.abs(delta) <= ALIGN_TOLERANCE_PX) return 'aligned';
        const vh = window.innerHeight || 800;
        const cap = Math.max(FINE_STEP_PX, Math.round(vh * SEARCH_JUMP_VH));
        let step = Math.max(-cap, Math.min(cap, delta));
        const here = scrollOffset();
        if (here > vh && here + step <= AT_TOP_PX) {
            step = -(here - (AT_TOP_PX + 1));
            if (step >= -1) return 'stuck';
        }
        scrollByDelta(step);
        if (Math.abs(scrollOffset() - here) < 1) return 'stuck';
        return 'moved';
    }

    function ageSpan() {
        const times = visibleOriginalTimes();
        const target = bookmarkTargetMs(bookmark);
        if (!times.length || target === null) return null;
        return {
            oldest: Math.min.apply(null, times),
            newest: Math.max.apply(null, times),
            target
        };
    }

    function seekZone(span) {
        if (!span) return 'far';
        if (span.newest + NEWER_SLACK_MS < span.target) return 'passed';
        if (span.oldest <= span.target + NEWER_SLACK_MS) return 'band';
        if (span.oldest - span.target < NEAR_ZONE_MS) return 'near';
        return 'far';
    }

    async function placeOnReadingLine(el, gen) {
        if (!el) return false;
        const wantId = getPostTweetId(el);
        const wantRepost = isRepost(el);
        const recover = () => {
            if (!wantId) return null;
            return feedArticles().find((post) => getPostTweetId(post) === wantId && !!isRepost(post) === !!wantRepost) || null;
        };
        let missed = 0;
        let stuck = 0;
        for (let i = 0; i < 40; i += 1) {
            if (gen !== generation || seekCancel || !readingOn()) return false;
            if (!el || !el.isConnected) {
                el = recover();
                if (!el) {
                    missed += 1;
                    if (missed >= 10) return false;
                    await sleep(80);
                    continue;
                }
            }
            missed = 0;
            highlight(el);
            const status = nudgeToward(el);
            if (status === 'aligned') {
                await sleep(140);
                if (gen !== generation || seekCancel || !readingOn()) return false;
                if (!el.isConnected) el = recover();
                if (!el || !el.isConnected) {
                    missed += 1;
                    continue;
                }
                highlight(el);
                if (nudgeToward(el) === 'aligned') return true;
                continue;
            }
            if (status === 'lost') {
                el = null;
                continue;
            }
            if (status === 'stuck') {
                stuck += 1;
                if (stuck >= 4) return false;
                await sleep(120);
                continue;
            }
            stuck = 0;
            await sleep(status === 'wait' ? 120 : 40);
        }
        return false;
    }

    async function scanForBookmark(gen, direction, maxPx) {
        let moved = 0;
        while (moved < maxPx) {
            if (gen !== generation || seekCancel || !readingOn()) return null;
            const exact = findArticle(bookmark);
            if (exact) return exact;
            const here = scrollOffset();
            if (direction < 0 && here <= AT_TOP_PX) return findArticle(bookmark);
            const step = Math.min(FINE_STEP_PX, maxPx - moved);
            const before = visibleSignature();
            scrollByDelta(direction * step);
            moved += step;
            await waitForFeedChange(JUMP_FOLLOW_MS, before, JUMP_GAP_MS);
            if (Math.abs(scrollOffset() - here) < 24) return findArticle(bookmark);
            if (direction < 0) {
                const span = ageSpan();
                if (span && span.oldest > span.target + NEWER_SLACK_MS) return findArticle(bookmark);
            }
        }
        return findArticle(bookmark);
    }

    function holdAnchor() {
        const root = document.scrollingElement || document.documentElement;
        if (root) root.style.setProperty('overflow-anchor', 'none', 'important');
    }

    function releaseAnchor() {
        const root = document.scrollingElement || document.documentElement;
        if (!root) return;
        setTimeout(() => root.style.removeProperty('overflow-anchor'), 1600);
    }

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function visibleSignature() {
        return visibleParsed().map((post) => post.tweetId + (post.isRepost ? 'r' : '')).join(',');
    }

    // baseline leer: ab jetzt auf eine Änderung warten.
    // Mit baseline: die Änderung darf schon passiert sein.
    // minMs lässt den Feed kurz zeichnen, statt im selben Takt weiterzuspringen.
    async function waitForFeedChange(ms, baseline, minMs) {
        const start = baseline === undefined ? visibleSignature() : baseline;
        const t0 = Date.now();
        const floor = Math.min(ms, Math.max(0, minMs || 0));
        if (floor > 0) await sleep(floor);
        if (seekCancel) return false;
        if (visibleSignature() !== start) return true;
        while (Date.now() - t0 < ms) {
            if (seekCancel) return false;
            await sleep(40);
            if (seekCancel) return false;
            if (visibleSignature() !== start) return true;
        }
        return false;
    }

    async function waitForLoad(ms, beforeSig, beforeTail) {
        const t0 = Date.now();
        const changed = () => visibleSignature() !== beforeSig || tailKey() !== beforeTail;
        if (changed()) return true;
        while (Date.now() - t0 < ms) {
            if (seekCancel) return false;
            await sleep(40);
            if (seekCancel) return false;
            if (changed()) return true;
        }
        return changed();
    }

    // Nach der ersten Änderung kurz stillhalten, bis der Feed nicht mehr nachrückt.
    async function waitForSignatureSettle(ms) {
        let last = visibleSignature() + '|' + tailKey();
        let stableSince = Date.now();
        const cap = Date.now() + ms;
        while (Date.now() < cap) {
            if (seekCancel || !readingOn()) return false;
            await sleep(50);
            if (seekCancel || !readingOn()) return false;
            const nowSig = visibleSignature() + '|' + tailKey();
            if (nowSig !== last) {
                last = nowSig;
                stableSince = Date.now();
                continue;
            }
            if (Date.now() - stableSince >= 180) return true;
        }
        return !seekCancel && readingOn();
    }

    // ---------- Zustand ----------

    let bookmark = null;
    let phase = 'idle';
    let generation = 0;
    let seekCancel = false;
    let programmaticUntil = 0;
    let blockTopMarkUntil = 0;
    let lastUserInputAt = 0;
    let lastScrollY = 0;
    let lastRawScrollY = null;
    let upIntentUntil = 0;
    let downWheelPx = 0;
    let upSettleTimers = [];
    let activeScroller = null;
    let pillWatchUntil = 0;
    let pillClicks = 0;
    let pillClickLabel = '';
    let pillClickedAt = 0;
    let followingTab = null;
    let followingArmAt = 0;
    let autoDownloadEnabled = false;
    let downloadedPosts = new Set();
    let highlighted = null;
    let columnObserver = null;
    let observedColumn = null;
    let listenersBound = false;
    let bootedAccount = null;
    let lastNewPostArm = 0;
    let newPostCheckTimers = [];
    let awayAt = 0;
    let feedStale = false;
    let mapAccount = null;
    let orderedKeys = [];
    const mapEntries = new Map();
    let mapSaveTimer = null;

    function onHome() {
        return window.location.pathname.startsWith('/home');
    }

    // null heißt: Reiter noch unklar. Dann weiterlesen. Nur ein erkanntes „Für dich“ hält an.
    function readingOn() {
        return onHome() && followingTab !== false;
    }

    function cancelFlow() {
        generation += 1;
        seekCancel = true;
        if (phase !== 'idle') phase = 'idle';
    }

    function samePost(a, b) {
        return !!a && !!b &&
            a.tweetId === b.tweetId &&
            a.authorHandler === b.authorHandler &&
            !!a.isRepost === !!b.isRepost;
    }

    // ---------- Landkarte, nur Gedächtnis und Export ----------

    function mapKeyOf(post) {
        return post.tweetId + '-' + !!post.isRepost;
    }

    function rememberMap(post) {
        if (!post || !post.tweetId || followingTab === false) return;
        const key = mapKeyOf(post);
        const existing = mapEntries.get(key);
        if (existing) {
            existing.lastSeenAt = new Date().toISOString();
            if (post.authorHandler) existing.authorHandler = post.authorHandler;
            if (post.timestamp) existing.timestamp = post.timestamp;
        } else {
            mapEntries.set(key, {
                key,
                tweetId: post.tweetId,
                isRepost: !!post.isRepost,
                authorHandler: post.authorHandler || null,
                timestamp: post.timestamp || null,
                lastSeenAt: new Date().toISOString()
            });
        }
        if (!orderedKeys.includes(key)) orderedKeys.unshift(key);
        if (orderedKeys.length > MAP_MAX) {
            const dropped = orderedKeys.splice(MAP_MAX);
            for (const oldKey of dropped) mapEntries.delete(oldKey);
        }
        scheduleMapSave();
    }

    function ingestDomOrder() {
        if (!readingOn()) return;
        const parsed = feedArticles().map(readArticle).filter(Boolean);
        parsed.sort((a, b) => a.element.getBoundingClientRect().top - b.element.getBoundingClientRect().top);
        if (!parsed.length) return;
        const keys = [];
        for (const post of parsed) {
            const key = mapKeyOf(post);
            if (!mapEntries.has(key)) {
                mapEntries.set(key, {
                    key,
                    tweetId: post.tweetId,
                    isRepost: !!post.isRepost,
                    authorHandler: post.authorHandler,
                    timestamp: post.timestamp || null,
                    lastSeenAt: new Date().toISOString()
                });
            } else {
                mapEntries.get(key).lastSeenAt = new Date().toISOString();
            }
            if (!keys.includes(key)) keys.push(key);
        }
        if (!orderedKeys.length) {
            orderedKeys = keys.slice(0, MAP_MAX);
            scheduleMapSave();
            return;
        }
        const anchorIndex = keys.findIndex((key) => orderedKeys.includes(key));
        if (anchorIndex < 0) {
            const head = mapEntries.get(orderedKeys[0]);
            const headId = head ? tweetIdMs(head.tweetId) : null;
            const firstId = tweetIdMs(parsed[0].tweetId);
            if (headId !== null && firstId !== null && firstId > headId) {
                orderedKeys = keys.concat(orderedKeys);
            } else {
                orderedKeys = orderedKeys.concat(keys);
            }
        } else {
            const anchor = keys[anchorIndex];
            const at = orderedKeys.indexOf(anchor);
            const before = keys.slice(0, anchorIndex).filter((key) => !orderedKeys.includes(key));
            const after = keys.slice(anchorIndex + 1).filter((key) => !orderedKeys.includes(key));
            orderedKeys.splice(at, 0, ...before);
            const at2 = orderedKeys.indexOf(anchor);
            orderedKeys.splice(at2 + 1, 0, ...after);
        }
        const seen = new Set();
        orderedKeys = orderedKeys.filter((key) => {
            if (seen.has(key) || !mapEntries.has(key)) return false;
            seen.add(key);
            return true;
        }).slice(0, MAP_MAX);
        for (const key of Array.from(mapEntries.keys())) {
            if (!seen.has(key)) mapEntries.delete(key);
        }
        scheduleMapSave();
    }

    function scheduleMapSave() {
        if (mapSaveTimer) return;
        mapSaveTimer = setTimeout(() => {
            mapSaveTimer = null;
            persistMap();
        }, 1200);
    }

    function persistMap() {
        if (!mapAccount || !isPlausibleUserHandle(mapAccount)) return;
        const entries = {};
        for (const key of orderedKeys) {
            const entry = mapEntries.get(key);
            if (entry) entries[key] = entry;
        }
        try {
            GM_setValue(TIMELINE_MAP_KEY(mapAccount), JSON.stringify({
                orderedKeys: orderedKeys.slice(),
                entries,
                savedAt: new Date().toISOString()
            }));
        } catch (e) {
            log('Map', 'Speichern fehlgeschlagen', e);
        }
    }

    function applyMapObject(raw) {
        orderedKeys = [];
        mapEntries.clear();
        if (!raw || !Array.isArray(raw.orderedKeys) || !raw.entries) return;
        for (const key of raw.orderedKeys) {
            if (orderedKeys.length >= MAP_MAX) break;
            const source = raw.entries[key];
            if (!source || typeof source !== 'object') continue;
            const tweetId = sanitizeImportedTweetId(source.tweetId);
            if (!tweetId) continue;
            const isRepostFlag = source.isRepost === true;
            const expected = tweetId + '-' + isRepostFlag;
            if (key !== expected || mapEntries.has(expected)) continue;
            const clean = {
                key: expected,
                tweetId,
                isRepost: isRepostFlag,
                lastSeenAt: source.lastSeenAt || new Date().toISOString()
            };
            if (source.authorHandler) clean.authorHandler = source.authorHandler;
            if (source.timestamp) clean.timestamp = source.timestamp;
            mapEntries.set(expected, clean);
            orderedKeys.push(expected);
        }
    }

    function loadMap(account) {
        mapAccount = account;
        try {
            const raw = GM_getValue(TIMELINE_MAP_KEY(account), null);
            if (!raw) return;
            applyMapObject(typeof raw === 'string' ? JSON.parse(raw) : raw);
        } catch (e) {
            log('Map', 'Laden fehlgeschlagen', e);
        }
    }

    // ---------- Speichern ----------

    function capDownloadedPostList(list) {
        const kept = [];
        const arr = Array.isArray(list) ? list : [];
        for (const item of arr) {
            if (typeof item !== 'string' || !item || item.length > 80) continue;
            kept.push(item);
        }
        return kept.slice(-MAX_DOWNLOADED_POSTS);
    }

    function saveDownloadedPosts() {
        const capped = capDownloadedPostList(Array.from(downloadedPosts));
        downloadedPosts = new Set(capped);
        GM_setValue('downloadedPosts', capped);
    }

    function addRepostToLog(post, account) {
        if (!post || !post.isRepost) return;
        const reposter = post.element ? getReposterHandler(post.element) : null;
        if (!reposter || !post.authorHandler) return;
        const key = REPOST_LOG_KEY(account);
        let entries = GM_getValue(key, []);
        if (!Array.isArray(entries)) entries = [];
        const now = new Date().toISOString();
        const duplicate = entries.some((entry) =>
            entry.reposter === reposter &&
            entry.originalAuthor === post.authorHandler &&
            Math.abs(new Date(entry.repostDate || 0).getTime() - Date.now()) < 24 * 60 * 60 * 1000
        );
        if (duplicate) return;
        entries.push({
            reposter,
            originalAuthor: post.authorHandler,
            repostDate: post.timestamp || now,
            discoveredAt: now
        });
        if (entries.length > REPOST_LOG_MAX) entries = entries.slice(-REPOST_LOG_MAX);
        GM_setValue(key, entries);
    }

    async function saveBookmark(record, force) {
        const freshAccount = readUserHandleFromNav();
        if (!isPlausibleUserHandle(freshAccount)) {
            log('Save', 'Kein frischer Account — Speichern abgebrochen');
            return false;
        }
        record.account = freshAccount;
        mapAccount = freshAccount;
        if (!force) {
            try {
                const currentRaw = GM_getValue(STORAGE_KEY(freshAccount), null);
                if (currentRaw) {
                    const current = JSON.parse(currentRaw);
                    if (current && current.tweetId && !isCandidateNewer(record, current) && !samePost(record, current)) {
                        return false;
                    }
                }
            } catch (e) { /* überschreiben */ }
        }
        try {
            GM_setValue(STORAGE_KEY(freshAccount), JSON.stringify(record));
            const historyKey = HISTORY_KEY(freshAccount);
            let history = GM_getValue(historyKey, []);
            if (!Array.isArray(history)) history = [];
            history.push(Object.assign({ savedAt: new Date().toISOString() }, record));
            if (history.length > HISTORY_MAX) history = history.slice(-HISTORY_MAX);
            GM_setValue(historyKey, history);
            rememberMap(record);
            return true;
        } catch (err) {
            log('Save', 'Fehler beim Speichern', err);
            showPopup('saveError', 6000);
            return false;
        }
    }

    async function adopt(post, force) {
        if (!post || !post.tweetId || !post.authorHandler || !post.timestamp) return false;
        const account = readUserHandleFromNav();
        if (!isPlausibleUserHandle(account)) return false;
        const record = {
            tweetId: post.tweetId,
            authorHandler: post.authorHandler,
            timestamp: post.timestamp,
            isRepost: !!post.isRepost,
            readAt: post.isRepost ? (post.readAt || new Date().toISOString()) : post.timestamp,
            account
        };
        if (!force && bookmark && samePost(record, bookmark)) {
            if (post.element) highlight(post.element);
            return true;
        }
        if (!force && bookmark && !isCandidateNewer(record, bookmark)) return false;
        bookmark = record;
        if (post.element) highlight(post.element);
        addRepostToLog(post, account);
        await saveBookmark(record, !!force);
        log('Save', 'Lesestelle @' + record.authorHandler, record.tweetId, record.isRepost ? '(Repost)' : '');
        return true;
    }

    function highlight(el) {
        if (!el || !el.isConnected) return;
        if (highlighted && highlighted !== el && highlighted.isConnected) {
            highlighted.style.removeProperty('box-shadow');
            highlighted.style.removeProperty('outline');
        }
        el.style.setProperty('box-shadow', 'none', 'important');
        el.style.setProperty('outline', '1px solid rgba(246, 146, 25, 0.95)', 'important');
        highlighted = el;
    }

    function showBookmark() {
        if (!bookmark || followingTab === false) return;
        const el = findArticle(bookmark);
        if (el) highlight(el);
    }

    // ---------- Reiter ----------

    function homeTabNodes() {
        const nodes = [];
        const seen = new Set();
        const root = document.querySelector('[data-testid="primaryColumn"]') || document.body;
        if (!root) return nodes;
        const add = (el, label) => {
            const kind = tabKind(label);
            if (!kind || el.closest('article')) return;
            const host = el.closest('[role="tab"]') || el;
            if (seen.has(host)) return;
            seen.add(host);
            nodes.push({ host, kind, labelEl: el });
        };
        for (const tab of root.querySelectorAll('[role="tab"]')) {
            add(tab, normalizeHomeTabLabel(tab.innerText || tab.textContent));
        }
        if (nodes.some((node) => node.kind === 'following') && nodes.some((node) => node.kind === 'for-you')) {
            return nodes;
        }
        for (const span of root.querySelectorAll('span')) {
            const raw = span.textContent || '';
            if (raw.trim().length > 40) continue;
            add(span, normalizeHomeTabLabel(raw));
        }
        return nodes;
    }

    function tabLooksSelected(host) {
        let node = host;
        for (let guard = 0; node && guard < 6; guard += 1) {
            if (node.getAttribute &&
                (node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-current') === 'page')) {
                return true;
            }
            node = node.parentElement;
        }
        return false;
    }

    function labelIsMuted(node) {
        try {
            const color = getComputedStyle(node).color || '';
            return /113,\s*118,\s*123|83,\s*100,\s*113|139,\s*152,\s*165|107,\s*125,\s*140/.test(color);
        } catch (e) {
            return false;
        }
    }

    function readFollowingTabSelected() {
        const nodes = homeTabNodes();
        const following = nodes.filter((node) => node.kind === 'following');
        const forYou = nodes.filter((node) => node.kind === 'for-you');
        if (!following.length || !forYou.length) return null;
        const selected = nodes.filter((node) => tabLooksSelected(node.host));
        if (selected.length === 1) return selected[0].kind === 'following';
        const followingMuted = labelIsMuted(following[0].labelEl);
        const forYouMuted = labelIsMuted(forYou[0].labelEl);
        if (followingMuted === forYouMuted) return null;
        return !followingMuted;
    }

    function armFollowing(reason) {
        const now = Date.now();
        const fresh = followingTab !== true || now - followingArmAt > 1500;
        if (!fresh) {
            showBookmark();
            tryPill();
            return;
        }
        followingArmAt = now;
        cancelFlow();
        followingTab = true;
        pillClicks = 0;
        pillClickLabel = '';
        pillClickedAt = 0;
        log('Init', 'Folge ich aktiv (' + reason + ').');
        showBookmark();
        armNewPostCheck('folge-ich');
    }

    function syncTab(reason) {
        if (!onHome()) {
            followingTab = null;
            return;
        }
        const selected = readFollowingTabSelected();
        if (selected === null || selected === followingTab) return;
        if (!selected) {
            followingTab = false;
            cancelFlow();
            log('Init', 'Für dich — Lesestelle wartet auf Folge ich.');
            return;
        }
        if (followingTab === false) armFollowing(reason);
        else {
            followingTab = true;
            showBookmark();
            armNewPostCheck('reiter');
        }
    }

    function homeTabLabelFromClick(event) {
        const el = event.target instanceof Element ? event.target : null;
        if (!el || el.closest('article')) return '';
        const tab = el.closest('[role="tab"]');
        if (tab) return normalizeHomeTabLabel(tab.innerText || tab.textContent);
        const span = el.closest('span');
        if (!span) return '';
        return normalizeHomeTabLabel(span.textContent);
    }

    function onTabClick(event) {
        const label = homeTabLabelFromClick(event);
        if (!label) return;
        if (FOLLOWING_TAB_LABELS.has(label)) {
            setTimeout(() => armFollowing('klick'), 50);
            setTimeout(() => armFollowing('klick'), 400);
            setTimeout(() => armFollowing('klick'), 1200);
            return;
        }
        if (FOR_YOU_TAB_LABELS.has(label)) {
            setTimeout(() => syncTab('reiter'), 50);
            setTimeout(() => syncTab('reiter'), 400);
        }
    }

    // ---------- Pille ----------

    function pillHostIsShown(host) {
        if (!host || !host.isConnected) return false;
        let node = host;
        while (node && node !== document.documentElement) {
            if (node.getAttribute && node.getAttribute('aria-hidden') === 'true') return false;
            try {
                const style = getComputedStyle(node);
                if (style.display === 'none' || style.visibility === 'hidden') return false;
            } catch (e) { /* weiter */ }
            node = node.parentElement;
        }
        return true;
    }

    function findPill() {
        const pattern = /\b(new posts|neue posts(?:\s+sehen)?|neue posts sind verfügbar|neue Beiträge|nouveaux tweets|nuevos tweets|新しい投稿|Новые посты|novos posts|منشورات جديدة|nuovi post|새 게시물|new tweets|post anzeigen|posts anzeigen|show \d+ posts?)\b/i;
        const exclude = /\b(teilen|share|posten|veröffentlichen|grok)\b/i;
        const gap = /\b(versteckt\w*|hidden|show\s+more|mehr anzeigen)\b/i;
        const matches = (text) => {
            const normalized = (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
            if (!normalized || normalized.length > 80) return false;
            return pattern.test(normalized) && !exclude.test(normalized) && !gap.test(normalized);
        };
        const smallTop = (host) => {
            const rect = host.getBoundingClientRect();
            return rect.top >= -80 && rect.top <= 420 &&
                rect.width >= 40 && rect.width <= 520 &&
                rect.height >= 12 && rect.height <= 96;
        };
        const isBlue = (value) => {
            const compact = (value || '').replace(/\s+/g, '');
            return compact === 'rgb(29,155,240)' || compact.indexOf('rgba(29,155,240,') === 0;
        };
        const hostIsBlue = (host) => {
            if (!host) return false;
            const styleAttr = host.getAttribute && host.getAttribute('style') || '';
            if (styleAttr.indexOf('29, 155, 240') !== -1 || styleAttr.indexOf('29,155,240') !== -1) return true;
            try {
                const style = getComputedStyle(host);
                if (isBlue(style.color) || isBlue(style.backgroundColor)) return true;
            } catch (e) { /* weiter */ }
            const labelled = host.querySelector && host.querySelector('[style*="29, 155, 240"], [style*="29,155,240"]');
            return !!labelled;
        };
        const accept = (host, text) => {
            if (!host || !pillHostIsShown(host) || !matches(text) || !smallTop(host)) return null;
            return { host, text: (text || '').replace(/\s+/g, ' ').trim() };
        };
        for (const pillLabel of document.querySelectorAll('[data-testid="pillLabel"]')) {
            const btn = pillLabel.closest('button, [role="button"]') || pillLabel.parentElement;
            const combined = ((pillLabel.textContent || '') + ' ' + ((btn && btn.getAttribute && btn.getAttribute('aria-label')) || '')).trim();
            const found = accept(btn, combined);
            if (found) return found;
        }
        const column = document.querySelector("[data-testid='primaryColumn']") || document.querySelector('main');
        if (!column) return null;
        for (const span of column.querySelectorAll('span')) {
            const text = span.textContent || '';
            if (!matches(text)) continue;
            let host = span;
            let chosen = null;
            for (let guard = 0; host && guard < 6; guard += 1) {
                const found = accept(host, text);
                if (found) chosen = found;
                if (host.getAttribute && (host.getAttribute('role') === 'button' || host.tagName === 'BUTTON')) break;
                host = host.parentElement;
            }
            if (chosen) return chosen;
        }
        return null;
    }

    function tryPill() {
        if (!readingOn()) return;
        // Suche und Pille laufen zu Ende. Eine zweite Pille bricht das Wiederfinden nicht ab.
        if (phase !== 'idle') return;
        const watch = Date.now() < pillWatchUntil;
        // Im Leerlauf nur ganz oben. Nach Fokus liegt die Pille am Viewport,
        // auch wenn die Timeline weiter unten steht.
        if (!watch && !atTop()) return;
        const pill = findPill();
        if (!pill) {
            if (Date.now() - pillClickedAt >= PILL_RETRY_MS) {
                pillClicks = 0;
                pillClickLabel = '';
            }
            return;
        }
        if (pillClicks >= PILL_MAX_CLICKS && pill.text === pillClickLabel) return;
        if (Date.now() - pillClickedAt < PILL_RETRY_MS) return;
        void clickPill(pill);
    }

    async function clickPill(pill) {
        if (phase !== 'idle' || !readingOn()) return;
        const gen = ++generation;
        phase = 'pill';
        seekCancel = false;
        clearUpIntent();
        if (pill.text !== pillClickLabel) {
            pillClickLabel = pill.text;
            pillClicks = 0;
        }
        pillClicks += 1;
        pillClickedAt = Date.now();
        blockTopMarkUntil = Date.now() + 4000;
        const target = bookmark ? Object.assign({}, bookmark) : null;
        log('NewPosts', 'Pille', pill.text);
        const beforeClick = visibleSignature();
        const beforeTail = tailKey();
        try {
            pill.host.click();
        } catch (e) {
            log('NewPosts', 'Klick fehlgeschlagen', e);
        }
        if (gen !== generation || seekCancel || !readingOn()) {
            if (gen === generation) phase = 'idle';
            return;
        }
        const changed = await waitForLoad(feedStale ? 2500 : 800, beforeClick, beforeTail);
        if (gen !== generation || seekCancel || !readingOn()) {
            if (gen === generation) phase = 'idle';
            return;
        }
        if (changed && feedStale && target && target.tweetId && markSeekAfterRefresh()) {
            feedStale = false;
            log('NewPosts', 'Tab auffrischen, danach Lesestelle suchen');
            location.reload();
            return;
        }
        if (changed) await waitForSignatureSettle(700);
        if (gen !== generation || seekCancel || !readingOn()) {
            if (gen === generation) phase = 'idle';
            return;
        }
        bookmark = target;
        blockTopMarkUntil = Date.now() + 1800;
        if (target && target.tweetId) {
            await seekBookmark('pill', { silent: true, generationHint: gen });
        }
        if (gen === generation && phase === 'pill') phase = 'idle';
    }

    // ---------- Suche ----------

    function visibleSameTweet(bm) {
        if (!bm || !bm.tweetId) return null;
        const want = String(bm.tweetId);
        const posts = visibleParsed();
        return posts.find((post) => String(post.tweetId) === want && !!post.isRepost === !!bm.isRepost)
            || posts.find((post) => String(post.tweetId) === want)
            || null;
    }

    // Originalzeit. Ein Repost liegt im Feed bei readAt, nicht bei der Tweet-ID.
    function originalGap(post, target) {
        if (!post || post.isRepost || target === null) return null;
        const moment = tweetIdMs(post.tweetId);
        if (moment === null) return null;
        return Math.abs(target - moment);
    }

    function elementOnReadingLine() {
        const vh = window.innerHeight || 800;
        let topmost = null;
        let topmostTop = Infinity;
        for (const post of feedArticles()) {
            const rect = post.getBoundingClientRect();
            if (rect.height < 5 || rect.bottom <= 40 || rect.top >= vh) continue;
            if (rect.top <= READING_LINE_PX && rect.bottom >= READING_LINE_PX) return post;
            if (rect.top < topmostTop) {
                topmostTop = rect.top;
                topmost = post;
            }
        }
        return topmost;
    }

    // Die gespeicherte ID fehlt. Nimm dieselbe ID, sonst den Beitrag auf der
    // Lesezeile, wenn er zeitlich mit dem nächsten gleichauf liegt, sonst den
    // zeitnächsten sichtbaren Originalbeitrag.
    function chooseNearest(atBookmark) {
        if (!bookmark) return null;
        const same = visibleSameTweet(bookmark);
        if (same) return same;
        const target = bookmarkTargetMs(bookmark);
        let best = null;
        let bestGap = Infinity;
        for (const post of visibleParsed()) {
            const gap = originalGap(post, target);
            if (gap === null || gap >= bestGap) continue;
            bestGap = gap;
            best = post;
        }
        const line = rereadOnReadingLine();
        if (atBookmark && line) {
            const lineGap = originalGap(line, target);
            if (lineGap === null || !best || lineGap <= bestGap + 2 * 60 * 1000) return line;
        }
        if (best && (atBookmark || bestGap <= NEAR_MS)) return best;
        return null;
    }

    async function settleOnNearest(gen, atBookmark) {
        let post = chooseNearest(atBookmark);
        let raw = null;
        if ((!post || !post.element) && atBookmark) {
            raw = elementOnReadingLine();
            if (raw) post = readArticle(raw) || post;
        }
        const el = (post && post.element) || raw;
        if (!el) return null;
        const same = !!(post && bookmark && String(post.tweetId) === String(bookmark.tweetId));
        highlight(el);
        await placeOnReadingLine(el, gen);
        if (gen !== generation || seekCancel || !readingOn()) return 'abort';
        let live = el.isConnected ? el : null;
        if (!live && post && post.tweetId) {
            const want = String(post.tweetId);
            live = feedArticles().find((node) => String(getPostTweetId(node) || '') === want) || null;
        }
        if (!live && atBookmark) live = elementOnReadingLine();
        if (live) highlight(live);
        if (!same && post && post.tweetId) {
            const fresh = (live && readArticle(live)) || post;
            if (fresh.isRepost && bookmark && (bookmark.readAt || bookmark.timestamp)) {
                fresh.readAt = bookmark.readAt || bookmark.timestamp;
            }
            if (live) fresh.element = live;
            const saved = await adopt(fresh, true);
            const marked = findArticle(bookmark);
            if (marked) highlight(marked);
            else if (live && live.isConnected) highlight(live);
            log('Search', saved
                ? 'Zeitnächster Post ist die neue Lesestelle'
                : 'Zeitnächster Post markiert, Speichern ohne Autor übersprungen', fresh.tweetId);
            return 'nearest';
        }
        log('Search', 'Sichtbare Lesestelle markiert und zentriert');
        return 'same';
    }

    async function seekBookmark(reason, options = {}) {
        const silent = options.silent === true;
        const reportMiss = options.reportMiss !== false;
        if (!bookmark || !bookmark.tweetId) {
            if (!silent) showPopup('searchNoPosition', 5000);
            return;
        }
        if (!onHome()) {
            await goHomeThen(() => seekBookmark(reason, options));
            return;
        }
        if (followingTab === false) {
            showPopup('needFollowing', 5000);
            return;
        }
        if (options.generationHint && options.generationHint !== generation) return;
        if (!options.generationHint && (phase === 'seek' || phase === 'pill')) return;
        const gen = options.generationHint || (++generation);
        phase = 'seek';
        seekCancel = false;
        holdAnchor();
        if (!silent) {
            showPopup('searchPopup', 5000, {
                authorHandler: bookmark.authorHandler,
                tweetId: bookmark.tweetId
            });
        }
        log('Search', 'Suche', reason, '@' + bookmark.authorHandler, bookmark.tweetId);
        let emptyWaits = 0;
        let stagnant = 0;
        let bounces = 0;
        let lastY = scrollOffset();
        let lastJump = 0;
        let lastDir = 0;
        let placeMisses = 0;
        const still = () => gen === generation && !seekCancel && readingOn();
        const centerExact = async (el) => {
            const placed = await placeOnReadingLine(el, gen);
            if (!still()) return 'abort';
            if (placed) {
                placeMisses = 0;
                return 'done';
            }
            const live = findArticle(bookmark);
            if (!live) return 'gone';
            placeMisses += 1;
            if (placeMisses < 3) return 'retry';
            highlight(live);
            return 'marked';
        };
        try {
            for (let step = 0; step < SEARCH_MAX_STEPS; step += 1) {
                if (!still()) break;
                const exact = findArticle(bookmark);
                if (exact) {
                    const outcome = await centerExact(exact);
                    if (outcome === 'abort') return;
                    if (outcome === 'retry') continue;
                    if (outcome === 'done' || outcome === 'marked') {
                        finishFlow(gen);
                        log('Search', outcome === 'done' ? 'Lesestelle steht' : 'Lesestelle markiert, Ausrichten am Anschlag');
                        return;
                    }
                } else {
                    placeMisses = 0;
                }
                const zone = seekZone(ageSpan());
                const vhNow = window.innerHeight || 800;
                if (zone === 'passed' && scrollOffset() > AT_TOP_PX) {
                    const hereUp = scrollOffset();
                    const foundUp = await scanForBookmark(gen, -1, Math.round(vhNow * 0.9));
                    if (!still()) break;
                    if (foundUp) {
                        const outcome = await centerExact(foundUp);
                        if (outcome === 'abort') return;
                        if (outcome === 'retry' || outcome === 'gone') continue;
                        finishFlow(gen);
                        log('Search', 'Lesestelle oberhalb ausgerichtet');
                        return;
                    }
                    const movedUp = Math.abs(scrollOffset() - hereUp) >= 24;
                    if (movedUp) {
                        emptyWaits = 0;
                        lastY = scrollOffset();
                        if (lastDir === 1) bounces += 1;
                        else bounces = 0;
                        lastDir = -1;
                        if (bounces >= 3) break;
                        ingestDomOrder();
                        continue;
                    }
                    emptyWaits += 1;
                    if (emptyWaits < EMPTY_WAITS_MAX) continue;
                }
                if (zone === 'passed' || zone === 'band') {
                    const vh = vhNow;
                    let found = null;
                    if (zone !== 'passed') found = await scanForBookmark(gen, 1, Math.round(vh * 0.85));
                    if (!found && still()) {
                        const back = Math.max(Math.round(vh * 2), lastJump + Math.round(vh * 0.5));
                        found = await scanForBookmark(gen, -1, Math.min(back, Math.round(vh * 8)));
                    }
                    if (zone === 'passed' && !found && still()) {
                        found = await scanForBookmark(gen, 1, Math.round(vh * 1.5));
                    }
                    if (!still()) break;
                    if (found) {
                        const outcome = await centerExact(found);
                        if (outcome === 'abort') return;
                        if (outcome === 'retry' || outcome === 'gone') continue;
                        finishFlow(gen);
                        log('Search', 'Lesestelle in der Nähe ausgerichtet');
                        return;
                    }
                    const settled = await settleOnNearest(gen, true);
                    if (settled === 'abort') return;
                    if (settled === 'nearest' && reportMiss) showPopup('tweetIdNotFound', 5000);
                    if (gen === generation) finishFlow(gen);
                    return;
                }
                const before = visibleSignature();
                const beforeTail = tailKey();
                const here = scrollOffset();
                const vh = window.innerHeight || 800;
                if (zone === 'near') {
                    lastJump = FINE_STEP_PX;
                    scrollByDelta(FINE_STEP_PX);
                } else {
                    lastJump = stepTowardBookmark();
                }
                const didMove = Math.abs(scrollOffset() - here) >= 24;
                const revealed = visibleSignature() !== before || tailKey() !== beforeTail;
                let changed = revealed;
                const atEdge = !didMove || scrollRoomBelow() < vh * 0.5;
                if (!revealed) {
                    changed = await waitForLoad(atEdge ? LOAD_WAIT_MS : CLOSE_LOAD_WAIT_MS, before, beforeTail);
                }
                const y2 = scrollOffset();
                if (changed) {
                    emptyWaits = 0;
                } else if (atEdge) {
                    emptyWaits += 1;
                    if (emptyWaits >= EMPTY_WAITS_MAX) break;
                }
                if (zone === 'near') {
                    if (Math.abs(y2 - here) < 24) {
                        stagnant += 1;
                        if (stagnant >= 4) break;
                    } else {
                        stagnant = 0;
                    }
                }
                if (Math.abs(y2 - lastY) >= 24) {
                    const dir = y2 > lastY ? 1 : -1;
                    if (lastDir && dir !== lastDir) bounces += 1;
                    else bounces = 0;
                    lastDir = dir;
                    if (bounces >= 3) break;
                }
                lastY = y2;
                ingestDomOrder();
            }
            if (!still()) {
                log('Search', 'Suche abgebrochen');
                return;
            }
            const vh = window.innerHeight || 800;
            let found = findArticle(bookmark);
            if (!found) found = await scanForBookmark(gen, -1, Math.round(vh * 2));
            if (!found && still()) found = await scanForBookmark(gen, 1, Math.round(vh * 1.5));
            if (found && still()) {
                const outcome = await centerExact(found);
                if (outcome === 'abort') return;
                if (outcome === 'done' || outcome === 'marked') {
                    finishFlow(gen);
                    log('Search', 'Lesestelle am Ende der Suche');
                    return;
                }
            }
            if (!still()) return;
            const zoneNow = seekZone(ageSpan());
            const atBookmark = zoneNow === 'band' || zoneNow === 'passed'
                || windowReachedBookmark(visibleOriginalTimes(), bookmark);
            const settled = await settleOnNearest(gen, atBookmark);
            if (settled === 'abort') return;
            if (settled === 'nearest' && reportMiss) showPopup('tweetIdNotFound', 5000);
            if (!settled) log('Search', 'Suche beendet ohne Ersatz');
            if (gen === generation) finishFlow(gen);
        } finally {
            releaseAnchor();
            if (gen === generation && phase === 'seek') finishFlow(gen);
        }
    }

    function typingTarget(target) {
        if (!target || target.nodeType !== 1) return false;
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) return true;
        return !!(target.closest && target.closest('input, textarea, [contenteditable="true"], [role="textbox"]'));
    }

    function onSearchKey(event) {
        if (event.code !== 'Space' && event.code !== 'Spacebar') return;
        if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;
        if (phase !== 'seek' && phase !== 'pill') return;
        if (typingTarget(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        cancelFlow();
        showPopup('searchCancelled', 2500);
        log('Search', 'Space bricht die Suche ab');
    }

    function finishFlow(gen) {
        if (gen !== generation) return;
        phase = 'idle';
        programmaticUntil = Date.now() + 800;
        blockTopMarkUntil = Date.now() + 1800;
        const finishedAt = Date.now();
        let anchorY = scrollOffset();
        showBookmark();
        const recheck = async (delay) => {
            await sleep(delay);
            if (gen !== generation || phase !== 'idle' || !bookmark) return;
            if (lastUserInputAt > finishedAt) return;
            if (Math.abs(scrollOffset() - anchorY) > 80) return;
            const el = findArticle(bookmark);
            if (!el) return;
            highlight(el);
            if (nudgeToward(el) !== 'moved') return;
            anchorY = scrollOffset();
            await sleep(80);
            if (gen !== generation || phase !== 'idle' || lastUserInputAt > finishedAt) return;
            if (Math.abs(scrollOffset() - anchorY) > 80) return;
            const again = findArticle(bookmark);
            if (!again) return;
            highlight(again);
            if (nudgeToward(again) === 'moved') anchorY = scrollOffset();
        };
        void recheck(400);
        void recheck(1100);
    }

    async function goHomeThen(next) {
        showPopup('redirectToHome', 3000);
        const homeButton = document.querySelector("a[data-testid='AppTabBar_Home_Link']");
        if (homeButton) homeButton.click();
        else window.location.href = 'https://x.com/home';
        setTimeout(() => {
            if (onHome()) next();
        }, 1000);
    }

    // ---------- Mitlesen ----------

    function noteScroller(event) {
        if (!onHome()) return;
        let node = event && event.target;
        if (node === document || node === document.documentElement || node === document.body) {
            node = document.scrollingElement;
        }
        if (!node || node.nodeType !== 1) return;
        if (node.closest && node.closest('article')) return;
        if (node.scrollHeight > node.clientHeight + 40) activeScroller = node;
    }

    function clearUpIntent() {
        upIntentUntil = 0;
        downWheelPx = 0;
        for (const timer of upSettleTimers) clearTimeout(timer);
        upSettleTimers = [];
    }

    function upIntentFresh() {
        return Date.now() < upIntentUntil;
    }

    // „hat repostet“ steht oft erst nach dem Scrollen im Beitrag.
    function rereadOnReadingLine() {
        const top = topReadingPost();
        if (!top || !top.element) return top;
        const cached = repostCache.get(top.element);
        if (cached && !cached.isRepost) repostCache.delete(top.element);
        return readArticle(top.element) || top;
    }

    function promoteNewerOnReadingLine() {
        if (!readingOn() || phase !== 'idle' || Date.now() < programmaticUntil) return;
        if (Date.now() < blockTopMarkUntil && nearTop()) return;
        const top = rereadOnReadingLine();
        if (!top || (bookmark && !isCandidateNewer(top, bookmark))) return;
        void adopt(top, false);
    }

    function armUpRecheck() {
        for (const timer of upSettleTimers) clearTimeout(timer);
        upSettleTimers = UP_RECHECK_MS.map((delay) => setTimeout(() => {
            if (!upIntentFresh() || phase !== 'idle') return;
            promoteNewerOnReadingLine();
        }, delay));
    }

    // Rad, Tastatur oder ein echter Schritt nach oben. Ein späteres Nach-unten
    // durch den nachgeladenen Post löscht die Richtung nicht.
    function noteUpIntent() {
        if (phase !== 'idle' || !readingOn() || Date.now() < programmaticUntil) return;
        downWheelPx = 0;
        upIntentUntil = Date.now() + UP_INTENT_MS;
        armUpRecheck();
    }

    function noteRawScroll() {
        if (!readingOn() || phase !== 'idle' || Date.now() < programmaticUntil) return;
        const y = scrollOffset();
        if (lastRawScrollY === null) {
            lastRawScrollY = y;
            lastScrollY = y;
            return;
        }
        const delta = y - lastRawScrollY;
        lastRawScrollY = y;
        if (delta < -SCROLL_DEAD_PX) noteUpIntent();
    }

    function wheelPixels(event) {
        const dy = event.deltaY || 0;
        if (event.deltaMode === 1) return dy * 16;
        if (event.deltaMode === 2) return dy * (window.innerHeight || 800);
        return dy;
    }

    function onUserScroll(event) {
        if (!onHome()) return;
        noteScroller(event);
        const y = scrollOffset();
        if (!readingOn()) {
            lastScrollY = y;
            return;
        }
        if (Date.now() < programmaticUntil || phase !== 'idle') {
            lastScrollY = y;
            return;
        }
        lastUserInputAt = Date.now();
        const delta = y - lastScrollY;
        lastScrollY = y;
        if (delta < -SCROLL_DEAD_PX) noteUpIntent();
        const wentUp = upIntentFresh();
        const arrivedTop = atTop() || nearTop();
        if (!wentUp && Math.abs(delta) < SCROLL_DEAD_PX) {
            showBookmark();
            if (arrivedTop) tryPill();
            return;
        }
        if (!wentUp && Date.now() < blockTopMarkUntil && nearTop()) {
            showBookmark();
            if (arrivedTop) tryPill();
            return;
        }
        if (wentUp) {
            promoteNewerOnReadingLine();
            showBookmark();
            if (arrivedTop) tryPill();
            return;
        }
        showBookmark();
        if (arrivedTop) tryPill();
    }

    function onWheel(event) {
        if (!event || event.isTrusted === false || event.ctrlKey) return;
        lastUserInputAt = Date.now();
        if (phase !== 'idle') {
            cancelFlow();
            programmaticUntil = 0;
            blockTopMarkUntil = 0;
            clearUpIntent();
            return;
        }
        const dy = wheelPixels(event);
        if (dy < -1) noteUpIntent();
        else if (dy > 1 && upIntentFresh()) {
            downWheelPx += dy;
            if (downWheelPx > DOWN_WHEEL_CANCEL_PX) clearUpIntent();
        }
    }

    const debouncedScroll = debounce(onUserScroll, 150);

    function clearNewPostChecks() {
        for (const timer of newPostCheckTimers) clearTimeout(timer);
        newPostCheckTimers = [];
    }

    // Sofort und kurz danach noch einmal: die Pille erscheint oft erst nach dem Fokus.
    function armNewPostCheck(reason) {
        if (document.visibilityState === 'hidden') return;
        if (!onHome() || followingTab === false) return;
        const now = Date.now();
        const again = now - lastNewPostArm < 700;
        lastNewPostArm = now;
        if (!again) {
            pillClicks = 0;
            pillClickLabel = '';
            pillClickedAt = 0;
            pillWatchUntil = Date.now() + PILL_WATCH_MS;
            log('NewPosts', 'Prüfe neue Posts', reason);
            clearNewPostChecks();
            for (const delay of [200, 600, 1200, 2500]) {
                newPostCheckTimers.push(setTimeout(() => {
                    if (!readingOn() || Date.now() > pillWatchUntil) return;
                    tryPill();
                }, delay));
            }
        }
        tryPill();
    }

    function noteAway() {
        if (!awayAt) awayAt = Date.now();
    }

    function noteBack() {
        if (!awayAt) return;
        if (Date.now() - awayAt >= STALE_AWAY_MS) feedStale = true;
        awayAt = 0;
    }

    function markSeekAfterRefresh() {
        try {
            sessionStorage.setItem(REFRESH_SEEK_KEY, '1');
            return true;
        } catch (e) {
            return false;
        }
    }

    function takeSeekAfterRefresh() {
        try {
            if (sessionStorage.getItem(REFRESH_SEEK_KEY) !== '1') return false;
            sessionStorage.removeItem(REFRESH_SEEK_KEY);
            return true;
        } catch (e) {
            return false;
        }
    }

    function onWindowFocus() {
        noteBack();
        if (!document.hasFocus()) return;
        armNewPostCheck('fokus');
    }

    function onVisibility() {
        if (document.visibilityState === 'hidden') {
            noteAway();
            clearNewPostChecks();
            persistMap();
            maybeAutoDownload();
            return;
        }
        noteBack();
        armNewPostCheck('sichtbar');
    }

    function maybeAutoDownload() {
        if (!autoDownloadEnabled || !bookmark || !onHome() || followingTab === false || phase !== 'idle') return;
        const postKey = bookmark.tweetId + '-' + bookmark.authorHandler;
        if (downloadedPosts.has(postKey)) return;
        void downloadBookmark(false);
    }

    function rebindColumnObserver() {
        const column = document.querySelector('[data-testid="primaryColumn"]');
        if (!column || column === observedColumn) return;
        if (columnObserver) columnObserver.disconnect();
        observedColumn = column;
        let last = 0;
        columnObserver = new MutationObserver(() => {
            const now = Date.now();
            if (now - last < 400) return;
            last = now;
            if (!readingOn()) return;
            tryPill();
            if (phase !== 'idle') return;
            ingestDomOrder();
        });
        columnObserver.observe(column, { childList: true, subtree: true });
    }

    function tick() {
        if (!onHome()) return;
        syncTab('tick');
        if (!readingOn()) return;
        rebindColumnObserver();
        tryPill();
        if (phase === 'idle') {
            ingestDomOrder();
            showBookmark();
        }
    }

    function watchTabs(left) {
        syncTab('init');
        if (followingTab !== null || left <= 0) return;
        setTimeout(() => watchTabs(left - 1), 300);
    }

    async function loadStoredBookmark() {
        const account = await getCurrentUserHandle();
        if (!isPlausibleUserHandle(account)) return;
        autoDownloadEnabled = GM_getValue(AUTO_DOWNLOAD_KEY, false) === true;
        downloadedPosts = new Set(capDownloadedPostList(GM_getValue('downloadedPosts', [])));
        updateAutoSaveButtonVisual();
        let position = null;
        try {
            const raw = GM_getValue(STORAGE_KEY(account), null);
            if (raw) position = JSON.parse(raw);
        } catch (e) {
            position = null;
        }
        const downloadedPosition = GM_getValue('downloadedReadingPosition', null);
        const fresh = readUserHandleFromNav();
        if (downloadedPosition && downloadedPosition.tweetId &&
            downloadedPosition.account === account &&
            isPlausibleUserHandle(fresh) && fresh === account) {
            try {
                if (!position || !position.tweetId || BigInt(downloadedPosition.tweetId) > BigInt(position.tweetId)) {
                    position = downloadedPosition;
                    GM_setValue(STORAGE_KEY(account), JSON.stringify(downloadedPosition));
                }
            } catch (e) { /* behalte die interne Stelle */ }
        }
        if (!position || !position.tweetId || !position.authorHandler || !position.timestamp) {
            bookmark = null;
            loadMap(account);
            return;
        }
        if (!position.readAt) position.readAt = position.timestamp;
        bookmark = position;
        try {
            const history = GM_getValue(HISTORY_KEY(account), []);
            const cutoff = Date.now() - SEVEN_DAYS_MS;
            const filtered = (Array.isArray(history) ? history : []).filter((item) => {
                const rawTime = item && (item.readAt || item.savedAt || item.timestamp);
                const ms = new Date(rawTime || 0).getTime();
                return Number.isFinite(ms) && ms > cutoff;
            });
            GM_setValue(HISTORY_KEY(account), filtered);
        } catch (e) { /* Historie bleibt */ }
        loadMap(account);
        log('Init', 'Lesestelle geladen @' + bookmark.authorHandler, bookmark.tweetId);
    }

    async function bootReading() {
        if (!onHome()) return;
        if (bootedAccount) {
            syncTab('boot');
            showBookmark();
            watchTabs(8);
            return;
        }
        await loadStoredBookmark();
        const account = readUserHandleFromNav() || cachedUserHandle;
        if (isPlausibleUserHandle(account)) bootedAccount = account;
        log('Init', 'Lesestelle 2026.10.21c');
        syncTab('boot');
        if (bookmark && bookmark.tweetId && followingTab !== false && takeSeekAfterRefresh()) {
            log('Search', 'Nach dem Auffrischen die Lesestelle suchen');
            showBookmark();
            watchTabs(8);
            void seekBookmark('auffrischen');
            return;
        }
        if (readingOn()) armNewPostCheck('start');
        showBookmark();
        watchTabs(8);
    }

    function startReading() {
        if (!listenersBound) {
            listenersBound = true;
            document.addEventListener('scroll', (event) => {
                noteScroller(event);
                noteRawScroll();
                debouncedScroll(event);
            }, true);
            document.addEventListener('click', onTabClick, true);
            window.addEventListener('wheel', onWheel, { passive: true, capture: true });
            document.addEventListener('visibilitychange', onVisibility);
            window.addEventListener('keydown', onSearchKey, true);
            window.addEventListener('focus', onWindowFocus);
            window.addEventListener('blur', () => noteAway());
            window.addEventListener('blur', debounce(maybeAutoDownload, 1000));
            window.addEventListener('beforeunload', () => {
                persistMap();
                maybeAutoDownload();
            });
            setInterval(tick, 3000);
            createButtons();
        }
        void bootReading();
    }

    function onSpaRoute() {
        if (onHome()) startReading();
        else cancelFlow();
    }

    function installSpaRouting() {
        const wrapHistory = (name) => {
            const original = history[name];
            if (typeof original !== 'function' || original.__xtsWrapped) return;
            const wrapped = function () {
                const result = original.apply(this, arguments);
                onSpaRoute();
                return result;
            };
            wrapped.__xtsWrapped = true;
            history[name] = wrapped;
        };
        wrapHistory('pushState');
        wrapHistory('replaceState');
        window.addEventListener('popstate', onSpaRoute);
    }

    // ---------- Datei ----------

    function sanitizeImportedTweetId(value) {
        if (typeof value === 'number') {
            if (!Number.isSafeInteger(value)) return null;
            value = String(value);
        }
        if (typeof value !== 'string' || !/^\d{1,25}$/.test(value)) return null;
        return value;
    }

    function sanitizeImportedHandle(value) {
        if (typeof value !== 'string') return null;
        const handle = value.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, 15);
        return isPlausibleUserHandle(handle) ? handle : null;
    }

    function sanitizeImportedText(value, maxLen) {
        if (typeof value !== 'string') return null;
        const text = value.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, maxLen);
        return text || null;
    }

    function sanitizeImportedIso(value) {
        const text = sanitizeImportedText(value, 40);
        if (!text || !Number.isFinite(Date.parse(text))) return null;
        return text;
    }

    function sanitizeImportedContextRef(raw) {
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
        const tweetId = sanitizeImportedTweetId(raw.tweetId);
        const authorHandler = sanitizeImportedHandle(raw.authorHandler);
        if (!tweetId || !authorHandler) return null;
        const ref = { tweetId, authorHandler, isRepost: raw.isRepost === true };
        const timestamp = sanitizeImportedIso(raw.timestamp);
        if (timestamp) ref.timestamp = timestamp;
        return ref;
    }

    function sanitizeImportedContextList(list, max) {
        if (!Array.isArray(list)) return [];
        const out = [];
        for (const item of list) {
            if (out.length >= max) break;
            const ref = sanitizeImportedContextRef(item);
            if (ref) out.push(ref);
        }
        return out;
    }

    function sanitizeImportedPost(raw) {
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
        const tweetId = sanitizeImportedTweetId(raw.tweetId);
        const authorHandler = sanitizeImportedHandle(raw.authorHandler);
        const timestamp = sanitizeImportedIso(raw.timestamp);
        if (!tweetId || !authorHandler || !timestamp) return null;
        const post = { tweetId, authorHandler, timestamp, isRepost: raw.isRepost === true };
        const readAt = sanitizeImportedIso(raw.readAt);
        if (readAt) post.readAt = readAt;
        const savedAt = sanitizeImportedIso(raw.savedAt);
        if (savedAt) post.savedAt = savedAt;
        if (raw.context && typeof raw.context === 'object' && !Array.isArray(raw.context)) {
            post.context = {
                neighborsBefore: sanitizeImportedContextList(raw.context.neighborsBefore, 8),
                neighborsAfter: sanitizeImportedContextList(raw.context.neighborsAfter, 8),
                visibleAtSave: sanitizeImportedContextList(raw.context.visibleAtSave, 40)
            };
        }
        return post;
    }

    function sanitizeImportedRepost(raw) {
        if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
        const reposter = sanitizeImportedHandle(raw.reposter);
        const originalAuthor = sanitizeImportedHandle(raw.originalAuthor);
        if (!reposter || !originalAuthor) return null;
        const entry = { reposter, originalAuthor };
        const repostDate = sanitizeImportedIso(raw.repostDate);
        if (repostDate) entry.repostDate = repostDate;
        const discoveredAt = sanitizeImportedIso(raw.discoveredAt);
        if (discoveredAt) entry.discoveredAt = discoveredAt;
        return entry;
    }

    async function downloadBookmark(force) {
        if (!onHome()) return;
        if (!bookmark || !bookmark.tweetId || !bookmark.authorHandler) {
            showPopup('noValidPosition', 5000);
            return;
        }
        const postKey = bookmark.tweetId + '-' + bookmark.authorHandler;
        if (!force && downloadedPosts.has(postKey)) {
            showPopup('alreadyDownloaded', 5000);
            return;
        }
        try {
            const account = await getCurrentUserHandle();
            if (!isPlausibleUserHandle(account)) return;
            const history = GM_getValue(HISTORY_KEY(account), []);
            const exportHistory = (Array.isArray(history) ? history : []).slice(-50);
            const repostLog = GM_getValue(REPOST_LOG_KEY(account), []);
            const exportRepostLog = (Array.isArray(repostLog) ? repostLog : []).slice(-300);
            let exportedTimelineMap = null;
            if (orderedKeys.length) {
                const entries = {};
                for (const key of orderedKeys) {
                    if (mapEntries.get(key)) entries[key] = mapEntries.get(key);
                }
                exportedTimelineMap = {
                    orderedKeys: orderedKeys.slice(),
                    entries,
                    savedAt: new Date().toISOString()
                };
            }
            const now = new Date();
            const fileName = account + '_' + bookmark.authorHandler + '_' +
                now.toISOString().slice(0, 10) + '_' +
                now.toISOString().slice(11, 16).replace(':', '') + '.json';
            const exportData = {
                account,
                current: Object.assign({}, bookmark),
                history: exportHistory,
                repostLog: exportRepostLog,
                timelineMap: exportedTimelineMap,
                exportedAt: now.toISOString(),
                version: '1.2'
            };
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = fileName;
            anchor.style.display = 'none';
            document.body.appendChild(anchor);
            anchor.click();
            downloadedPosts.add(postKey);
            saveDownloadedPosts();
            showPopup('downloadSuccess', 8000, { fileName });
            setTimeout(() => {
                if (anchor.parentNode) anchor.parentNode.removeChild(anchor);
                URL.revokeObjectURL(url);
            }, 3000);
        } catch (err) {
            log('Load', 'Download-Fehler', err);
            showPopup('downloadFailed', 10000);
        }
    }

    function loadBookmarkFromFile() {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json,application/json';
            input.style.display = 'none';
            document.body.appendChild(input);
            input.addEventListener('change', () => {
                const file = input.files && input.files[0];
                if (!file) {
                    showPopup('fileSelectError', 5000);
                    input.remove();
                    return;
                }
                if (file.size > IMPORT_FILE_MAX_BYTES) {
                    showPopup('fileReadError', 5000);
                    input.remove();
                    return;
                }
                const reader = new FileReader();
                reader.onload = async () => {
                    try {
                        const data = JSON.parse(String(reader.result || ''));
                        const imported = sanitizeImportedPost(data && data.current);
                        if (!imported) {
                            showPopup('invalidPosition', 5000);
                            return;
                        }
                        const account = readUserHandleFromNav();
                        if (!isPlausibleUserHandle(account)) {
                            showPopup('fileReadError', 5000);
                            return;
                        }
                        imported.account = account;
                        if (!imported.readAt) imported.readAt = imported.timestamp;
                        bookmark = imported;
                        GM_setValue(STORAGE_KEY(account), JSON.stringify(bookmark));
                        if (Array.isArray(data.history)) {
                            const importedHistory = [];
                            for (const item of data.history) {
                                const post = sanitizeImportedPost(item);
                                if (!post) continue;
                                post.account = account;
                                importedHistory.push(post);
                            }
                            GM_setValue(HISTORY_KEY(account), importedHistory.slice(-50));
                        }
                        if (Array.isArray(data.repostLog)) {
                            const importedReposts = [];
                            for (const item of data.repostLog) {
                                const entry = sanitizeImportedRepost(item);
                                if (entry) importedReposts.push(entry);
                            }
                            GM_setValue(REPOST_LOG_KEY(account), importedReposts.slice(-REPOST_LOG_MAX));
                        }
                        if (data.timelineMap && typeof data.timelineMap === 'object') {
                            applyMapObject(data.timelineMap);
                            mapAccount = account;
                            persistMap();
                        }
                        if (bookmark.tweetId) rememberMap(bookmark);
                        bootedAccount = account;
                        const selected = readFollowingTabSelected();
                        showPopup('fileLoadSuccess', 4000);
                        const already = findArticle(bookmark);
                        if (already) highlight(already);
                        if (selected === false) {
                            followingTab = false;
                            showPopup('needFollowing', 5000);
                        } else {
                            if (selected === true) followingTab = true;
                            cancelFlow();
                            void seekBookmark('datei', { silent: true });
                        }
                    } catch (err) {
                        log('Load', 'JSON', err);
                        showPopup('fileReadError', 5000);
                    } finally {
                        input.remove();
                    }
                };
                reader.readAsText(file);
            });
            input.click();
        } catch (err) {
            log('Load', 'Datei-Dialog', err);
            showPopup('fileDialogError', 5000);
        }
    }

    async function saveCurrentByHand() {
        if (followingTab === false) {
            showPopup('needFollowing', 5000);
            return;
        }
        const top = topReadingPost();
        if (!top) {
            showPopup('noValidPosition', 5000);
            return;
        }
        const saved = await adopt(top, true);
        if (!saved) {
            showPopup('noValidPosition', 5000);
            return;
        }
        await downloadBookmark(true);
    }

    function toggleAutoSave() {
        autoDownloadEnabled = !autoDownloadEnabled;
        GM_setValue(AUTO_DOWNLOAD_KEY, autoDownloadEnabled);
        log('UI', 'Auto-Save ' + (autoDownloadEnabled ? 'an' : 'aus'));
        updateAutoSaveButtonVisual();
        showPopup('autoDownloadToggled', 5000, {
            status: userText(autoDownloadEnabled ? 'enabled' : 'disabled')
        });
    }

    function updateAutoSaveButtonVisual() {
        if (!window.autoSaveToggleBtn) return;
        const btn = window.autoSaveToggleBtn;
        while (btn.firstChild) btn.removeChild(btn.firstChild);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', autoDownloadEnabled ? '#ffffff' : '#ff6b6b');
        svg.setAttribute('stroke-width', '2.25');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.innerHTML = autoDownloadEnabled
            ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="6" x2="12" y2="12"></line>'
            : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="6" x2="12" y2="12"></line><line x1="5" y1="5" x2="19" y2="19"></line>';
        btn.style.opacity = autoDownloadEnabled ? '1' : '0.5';
        btn.appendChild(svg);
        btn.title = autoDownloadEnabled ? 'Auto-Save: AN' : 'Auto-Save: AUS';
    }

    function createButton(iconType, title, onClick) {
        const button = document.createElement('div');
        button.style.width = '44px';
        button.style.height = '44px';
        button.style.backgroundColor = 'rgba(29, 155, 240, 0.18)';
        button.style.border = '1px solid rgba(255,255,255,0.15)';
        button.style.borderRadius = '50%';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
        button.style.cursor = 'pointer';
        button.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.35)';
        button.style.zIndex = '10001';
        button.style.marginBottom = '10px';
        button.title = title;
        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', title);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '22');
        svg.setAttribute('height', '22');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', '#ffffff');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        let path = 'M12 6v12M6 12h12';
        if (iconType === 'search') path = 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z';
        if (iconType === 'save') path = 'M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8';
        if (iconType === 'load') path = 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z';
        if (iconType === 'toggle') path = 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.058 11H1M20 12v5h-.582M4.058 11H1M12 21v-4M12 3v4';
        svg.innerHTML = '<path d="' + path + '"></path>';
        button.appendChild(svg);
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            onClick();
        });
        return button;
    }

    function createButtons() {
        if (document.getElementById('xts-reading-buttons')) return;
        const mount = () => {
            if (!document.body || document.getElementById('xts-reading-buttons')) return;
            const box = document.createElement('div');
            box.id = 'xts-reading-buttons';
            box.style.position = 'fixed';
            box.style.bottom = '100px';
            box.style.left = '10px';
            box.style.zIndex = '10000';
            box.style.display = 'flex';
            box.style.flexDirection = 'column';
            const buttons = [
                ['search', 'Start manual search', () => {
                    if (followingTab === false) {
                        showPopup('needFollowing', 5000);
                        return;
                    }
                    void seekBookmark('lupe');
                }],
                ['save', 'Save current position', () => { void saveCurrentByHand(); }],
                ['load', 'Load last read position', () => loadBookmarkFromFile()],
                ['toggle', 'Toggle auto-save', () => toggleAutoSave()]
            ];
            buttons.forEach((entry, index) => {
                const btn = createButton(entry[0], entry[1], entry[2]);
                if (index === 3) window.autoSaveToggleBtn = btn;
                box.appendChild(btn);
            });
            document.body.appendChild(box);
            updateAutoSaveButtonVisual();
        };
        if (document.body) mount();
        else document.addEventListener('DOMContentLoaded', mount);
    }

    // =====================================================
    // Medien-Download (Bilder & Videos) — inspiriert von Twitter Click'n'Save
    // =====================================================

    const MEDIA_DOWNLOAD_STYLE_ID = 'xts-media-download-style';
    const TWEET_RESULT_BY_REST_ID_QUERY = 'zAz9764BcLZOJ0JU2wrd1A';
    const TWITTER_BEARER = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA';
    const mediaApiCache = new Map();
    const mediaVideoIndexByArticle = new WeakMap();
    let mediaDownloadScheduleScan = null;

    function getCookieValue(name) {
        const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
        return match ? decodeURIComponent(match[1]) : '';
    }

    function injectMediaDownloadStyles() {
        if (document.getElementById(MEDIA_DOWNLOAD_STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = MEDIA_DOWNLOAD_STYLE_ID;
        style.textContent = `
            .xts-media-download-btn {
                position: absolute;
                top: 8px;
                left: 8px;
                width: 34px;
                height: 34px;
                border-radius: 8px;
                border: 1px solid rgba(255,255,255,0.35);
                background: rgba(15, 20, 25, 0.82);
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                z-index: 100;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.15s ease, transform 0.15s ease, background 0.15s ease;
                backdrop-filter: blur(4px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
            }
            .xts-media-download-btn svg {
                width: 18px;
                height: 18px;
                stroke: currentColor;
                fill: none;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
            }
            article:hover .xts-media-download-btn,
            article[role="article"]:hover .xts-media-download-btn,
            li[role="listitem"]:hover .xts-media-download-btn,
            .xts-media-download-host:hover .xts-media-download-btn,
            a[href*="/photo/"]:hover .xts-media-download-btn,
            a[href*="/video/"]:hover .xts-media-download-btn,
            [data-testid="videoComponent"]:hover .xts-media-download-btn,
            .xts-media-download-btn:hover,
            .xts-media-download-btn.xts-media-downloading {
                opacity: 1;
                pointer-events: auto;
            }
            .xts-media-download-btn:hover {
                background: rgba(29, 155, 240, 0.85);
                transform: scale(1.06);
            }
            .xts-media-download-btn.xts-media-downloading {
                cursor: wait;
                background: rgba(29, 155, 240, 0.55);
            }
            .xts-media-download-btn.xts-media-downloaded {
                background: rgba(0, 186, 124, 0.75);
            }
        `.trim();
        document.head.appendChild(style);
    }

    function createMediaDownloadButton(isVideo = false) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'xts-media-download-btn';
        btn.dataset.isVideo = isVideo ? '1' : '0';
        btn.title = isVideo ? 'Video herunterladen' : 'Bild herunterladen';
        btn.setAttribute('aria-label', btn.title);
        btn.innerHTML = isVideo
            ? '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path></svg>'
            : '<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7"></path><path d="M17 3l4 4-9 9H8v-4z"></path></svg>';
        return btn;
    }

    function ensureMediaDownloadHost(element) {
        if (!element) return null;
        if (!element.classList.contains('xts-media-download-host')) {
            element.classList.add('xts-media-download-host');
        }
        return element;
    }

    function getTweetContextFromMediaElement(innerElem) {
        const statusLink = innerElem.closest('a[href*="/status/"]');
        if (statusLink) {
            const href = statusLink.getAttribute('href') || statusLink.href || '';
            const idMatch = href.match(/\/status\/(\d+)/);
            const authorMatch = href.match(/^\/([^/]+)\/status\//) || href.match(/(?:twitter|x)\.com\/([^/]+)\/status\//);
            if (idMatch) {
                return {
                    tweetId: idMatch[1],
                    author: authorMatch ? authorMatch[1] : null
                };
            }
        }

        const article = innerElem.closest("article[data-testid='tweet']") || innerElem.closest('article');
        if (article) {
            return {
                tweetId: getPostTweetId(article),
                author: getPostAuthorHandler(article)
            };
        }

        const pathMatch = location.pathname.match(/^\/([^/]+)\/status\/(\d+)/);
        if (pathMatch) {
            return { author: pathMatch[1], tweetId: pathMatch[2] };
        }

        return null;
    }

    function isVideoPosterImage(img) {
        const src = img.src || '';
        return src.includes('ext_tw_video_thumb')
            || src.includes('amplify_video_thumb')
            || src.includes('tweet_video_thumb');
    }

    function shouldSkipMediaImage(img) {
        if (!img || img.dataset.xtsMediaHandled === '1') return true;
        if (!img.src || img.src.endsWith('.svg')) return true;
        if (img.closest('[data-testid="Tweet-User-Avatar"]')) return true;
        if (img.src.includes('/profile_banners/')) return true;
        if (img.src.includes('/emoji/')) return true;
        if (img.closest('[data-testid="UserAvatar"]')) return true;
        if (img.src.includes('profile_images')) return true;
        if ((img.width || 0) > 0 && img.width < 140) return true;
        return false;
    }

    function isTweetMediaImage(img) {
        const src = img?.src || '';
        if (!src.includes('pbs.twimg.com/media/')) return false;
        if (isVideoPosterImage(img)) return false;
        return Boolean(
            img.closest('[data-testid="tweetPhoto"]')
            || img.closest('a[href*="/photo/"]')
        );
    }

    function getImageDownloadHost(img) {
        return img.closest('a[href*="/photo/"]');
    }

    function getVideoDownloadHost(video) {
        return video.closest('a[href*="/video/"]')
            || video.closest('a[href*="/photo/"]')
            || video.closest('[data-testid="videoComponent"]')?.parentElement
            || null;
    }

    function scheduleImageDownloadRetry(img) {
        if (!img || img.dataset.xtsMediaPending === '1') return;
        img.dataset.xtsMediaPending = '1';
        const finalize = () => {
            delete img.dataset.xtsMediaPending;
            if (typeof mediaDownloadScheduleScan === 'function') {
                mediaDownloadScheduleScan();
            }
        };
        if (img.complete) {
            setTimeout(finalize, 120);
            return;
        }
        img.addEventListener('load', finalize, { once: true });
        img.addEventListener('error', () => {
            img.dataset.xtsMediaHandled = '1';
            delete img.dataset.xtsMediaPending;
        }, { once: true });
    }

    function getImageDownloadUrlCandidates(url) {
        const urlObj = new URL(url);
        const originals = ['orig', '4096x4096'];
        const samples = ['large', '900x900', 'medium', 'small'];
        const candidates = [];

        for (const name of originals) {
            const copy = new URL(urlObj.toString());
            copy.searchParams.set('name', name);
            if (copy.searchParams.get('format') === 'webp') {
                copy.searchParams.set('format', 'jpg');
            }
            candidates.push(copy.toString());
        }

        const previewSize = urlObj.searchParams.get('name');
        if (previewSize && !originals.includes(previewSize) && !samples.includes(previewSize)) {
            samples.unshift(previewSize);
        }

        for (const name of samples) {
            const copy = new URL(urlObj.toString());
            copy.searchParams.set('name', name);
            if (copy.searchParams.get('format') === 'webp') {
                copy.searchParams.set('format', 'jpg');
            }
            candidates.push(copy.toString());
        }

        if (!urlObj.searchParams.has('name') && url.includes('pbs.twimg.com/media/')) {
            const parts = url.split('.');
            const ext = parts.pop();
            const base = parts.join('.');
            candidates.unshift(`${base}?format=${ext}&name=orig`);
        }

        return [...new Set(candidates)];
    }

    const MEDIA_HOSTS = new Set(['pbs.twimg.com', 'video.twimg.com', 'ton.twimg.com']);

    function isAllowedMediaUrl(url) {
        try {
            const parsed = new URL(url);
            if (parsed.protocol !== 'https:') return false;
            if (parsed.username || parsed.password) return false;
            return MEDIA_HOSTS.has(parsed.hostname);
        } catch (e) {
            return false;
        }
    }

    function extensionFromMime(mimeType, pathname = '') {
        const mime = String(mimeType || '').split(';')[0].trim().toLowerCase();
        let ext = '';
        if (mime === 'image/jpeg' || mime === 'image/jpg') ext = 'jpg';
        else if (mime === 'image/png') ext = 'png';
        else if (mime === 'image/webp') ext = 'webp';
        else if (mime === 'image/gif') ext = 'gif';
        else if (mime === 'video/mp4') ext = 'mp4';
        else if (!mime || mime === 'application/octet-stream') {
            const pathExt = String(pathname.split('.').pop() || '').toLowerCase();
            ext = pathExt === 'jpeg' ? 'jpg' : pathExt;
        }
        if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp' || ext === 'gif' || ext === 'mp4') {
            return ext === 'jpeg' ? 'jpg' : ext;
        }
        return null;
    }

    function sanitizeMediaToken(value, fallback, maxLen) {
        let text = String(value ?? '');
        text = text.replace(/[\u0000-\u001F\u007F]/g, '');
        text = text.replace(/\.\./g, '');
        text = text.replace(/[^A-Za-z0-9._-]+/g, '');
        text = text.replace(/^\.+/, '');
        if (!text) text = fallback;
        if (text.length > maxLen) text = text.slice(0, maxLen);
        return text || fallback;
    }

    function buildMediaFilename({ author, tweetId, baseName, extension, isSample = false }) {
        const ext = extensionFromMime(
            extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg'
                : extension === 'png' ? 'image/png'
                : extension === 'webp' ? 'image/webp'
                : extension === 'gif' ? 'image/gif'
                : extension === 'mp4' ? 'video/mp4'
                : ''
        );
        if (!ext) throw new Error('Media type not allowed');
        const datePart = new Date().toISOString().slice(0, 10);
        const samplePrefix = isSample ? 'sample_' : '';
        const safeAuthor = sanitizeMediaToken(author, 'unknown', 15);
        const safeTweet = sanitizeMediaToken(tweetId, 'tweet', 25);
        const safeName = sanitizeMediaToken(baseName, 'media', 80);
        return `${samplePrefix}${safeAuthor}_${datePart}_${safeTweet}_${safeName}.${ext}`;
    }

    async function fetchMediaBlob(url) {
        if (!isAllowedMediaUrl(url)) {
            throw new Error('Media URL not allowed');
        }
        const response = await fetch(url, { credentials: 'omit' });
        if (!isAllowedMediaUrl(response.url)) {
            throw new Error('Media URL not allowed');
        }
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const blob = await response.blob();
        if (!blob.size) {
            throw new Error('Empty blob');
        }
        const contentType = response.headers.get('content-type') || blob.type || '';
        const pathname = new URL(response.url).pathname;
        const extension = extensionFromMime(contentType, pathname);
        if (!extension) {
            throw new Error('Media type not allowed');
        }
        const filenamePart = pathname.split('/').pop() || 'media';
        const rawBase = filenamePart.replace(/\.[^.]+$/, '') || 'media';
        return {
            blob,
            extension,
            baseName: sanitizeMediaToken(rawBase, 'media', 80),
            status: response.status
        };
    }

    function triggerBlobDownload(blob, filename) {
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = filename;
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout(() => {
            anchor.remove();
            URL.revokeObjectURL(anchor.href);
        }, 30000);
    }

    async function downloadImageFromUrl(url, context) {
        const candidates = getImageDownloadUrlCandidates(url);
        let lastError = null;

        for (let i = 0; i < candidates.length; i++) {
            try {
                const result = await fetchMediaBlob(candidates[i]);
                const isSample = i > 0;
                const filename = buildMediaFilename({
                    author: context.author,
                    tweetId: context.tweetId,
                    baseName: result.baseName,
                    extension: result.extension,
                    isSample
                });
                triggerBlobDownload(result.blob, filename);
                return filename;
            } catch (err) {
                lastError = err;
            }
        }

        throw lastError || new Error('Image download failed');
    }

    function unwrapTweetResult(result) {
        if (!result) return null;
        return result.tweet || result;
    }

    function parseTweetLegacyMedias(tweetResult) {
        if (!tweetResult) return [];
        const tweetLegacy = tweetResult.legacy;
        const tweetUser = tweetResult.core?.user_results?.result;
        if (!tweetLegacy) return [];

        let sourceMedias = [];
        if (tweetLegacy.extended_entities?.media) {
            sourceMedias = tweetLegacy.extended_entities.media;
        } else if (tweetResult.card?.legacy?.binding_values) {
            try {
                const unified = tweetResult.card.legacy.binding_values.find((bv) => bv.key === 'unified_card');
                if (unified?.value?.string_value) {
                    const value = JSON.parse(unified.value.string_value);
                    sourceMedias = Object.values(value.media_entities || {});
                }
            } catch (e) {
                debugLog('Media', 'unified_card parse failed', e);
            }
        }

        const screenName = tweetUser?.legacy?.screen_name || tweetUser?.core?.screen_name || 'unknown';
        const tweetId = tweetResult.rest_id || tweetLegacy.id_str;
        const medias = [];

        for (const media of sourceMedias) {
            let downloadUrl = null;
            let previewUrl = media.media_url_https;

            if (media.video_info?.variants) {
                const best = media.video_info.variants
                    .filter((v) => v.bitrate !== undefined)
                    .reduce((acc, cur) => (!acc || cur.bitrate > acc.bitrate ? cur : acc), null);
                downloadUrl = best?.url || null;
            } else if (previewUrl) {
                if (previewUrl.includes('?format=')) {
                    downloadUrl = previewUrl;
                } else {
                    const parts = previewUrl.split('.');
                    const ext = parts.pop();
                    downloadUrl = `${parts.join('.')}?format=${ext}&name=orig`;
                }
            }

            if (!downloadUrl) continue;

            medias.push({
                screen_name: screenName,
                tweet_id: tweetId,
                download_url: downloadUrl,
                preview_url: previewUrl,
                type: media.type === 'animated_gif' ? 'video' : media.type
            });
        }

        return medias;
    }

    async function fetchTweetMedias(tweetId) {
        if (!tweetId) return [];
        if (mediaApiCache.has(tweetId)) {
            return mediaApiCache.get(tweetId);
        }

        const variables = {
            tweetId,
            withCommunity: false,
            includePromotedContent: false,
            withVoice: false
        };
        const features = {
            creator_subscriptions_tweet_preview_api_enabled: true,
            communities_web_enable_tweet_community_results_fetch: true,
            c9s_tweet_anatomy_moderator_badge_enabled: true,
            responsive_web_edit_tweet_api_enabled: true,
            graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
            view_counts_everywhere_api_enabled: true,
            longform_notetweets_consumption_enabled: true,
            responsive_web_twitter_article_tweet_consumption_enabled: true,
            tweet_awards_web_tipping_enabled: false,
            responsive_web_grok_image_annotation_enabled: true,
            responsive_web_graphql_timeline_navigation_enabled: true,
            responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
            responsive_web_enhance_cards_enabled: false
        };
        const fieldToggles = {
            withArticleRichContentState: true,
            withArticlePlainText: false
        };

        const url = new URL(`https://x.com/i/api/graphql/${TWEET_RESULT_BY_REST_ID_QUERY}/TweetResultByRestId`);
        url.searchParams.set('variables', JSON.stringify(variables));
        url.searchParams.set('features', JSON.stringify(features));
        url.searchParams.set('fieldToggles', JSON.stringify(fieldToggles));

        const headers = {
            authorization: TWITTER_BEARER,
            'x-csrf-token': getCookieValue('ct0'),
            'x-twitter-client-language': 'en',
            'x-twitter-active-user': 'yes',
            'content-type': 'application/json'
        };
        const guestToken = getCookieValue('gt');
        if (guestToken) {
            headers['x-guest-token'] = guestToken;
        } else {
            headers['x-twitter-auth-type'] = 'OAuth2Session';
        }

        const response = await fetch(url.toString(), { headers });
        const json = await response.json();
        const tweetResult = unwrapTweetResult(json?.data?.tweetResult?.result);
        let medias = parseTweetLegacyMedias(tweetResult);

        const quoted = tweetResult?.quoted_status_result?.result;
        if (quoted) {
            medias = medias.concat(parseTweetLegacyMedias(unwrapTweetResult(quoted)));
        }

        mediaApiCache.set(tweetId, medias);
        if (mediaApiCache.size > 24) {
            mediaApiCache.delete(mediaApiCache.keys().next().value);
        }

        return medias;
    }

    function stripUrlSearchParams(url) {
        try {
            const parsed = new URL(url);
            return parsed.origin + parsed.pathname;
        } catch (e) {
            return url.split('?')[0];
        }
    }

    async function downloadVideoForButton(btn, posterUrl, context) {
        const medias = await fetchTweetMedias(context.tweetId);
        const posterBase = stripUrlSearchParams(posterUrl || '');
        let mediaEntry = medias.find((m) => stripUrlSearchParams(m.preview_url || '').startsWith(posterBase) || posterBase.startsWith(stripUrlSearchParams(m.preview_url || '')));

        if (!mediaEntry) {
            mediaEntry = medias.find((m) => m.type === 'video' || m.type === 'animated_gif');
        }

        if (!mediaEntry?.download_url) {
            throw new Error('No video URL');
        }

        const result = await fetchMediaBlob(mediaEntry.download_url);
        const filename = buildMediaFilename({
            author: mediaEntry.screen_name || context.author,
            tweetId: mediaEntry.tweet_id || context.tweetId,
            baseName: result.baseName,
            extension: result.extension
        });
        triggerBlobDownload(result.blob, filename);
        return filename;
    }

    async function onMediaDownloadClick(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const btn = event.currentTarget;
        if (btn.classList.contains('xts-media-downloading')) return;

        const lang = getUserLanguage();
        const context = getTweetContextFromMediaElement(btn);
        if (!context?.tweetId) {
            showPopup('mediaDownloadNoMedia', 4000);
            return;
        }

        btn.classList.add('xts-media-downloading');
        showPopup('mediaDownloadInProgress', 2500);

        try {
            let filename;
            if (btn.dataset.isVideo === '1') {
                filename = await downloadVideoForButton(btn, btn.dataset.posterUrl || '', context);
            } else {
                filename = await downloadImageFromUrl(btn.dataset.mediaUrl || '', context);
            }
            btn.classList.remove('xts-media-downloading');
            btn.classList.add('xts-media-downloaded');
            showPopup('mediaDownloadSuccess', 5000, { fileName: filename });
            debugLog('Media', `Download OK: ${filename}`);
        } catch (err) {
            btn.classList.remove('xts-media-downloading');
            log('Media', 'Download fehlgeschlagen:', err);
            showPopup('mediaDownloadFailed', 5000);
        }
    }

    function attachMediaDownloadButton(host, btn, selector = ':scope > .xts-media-download-btn') {
        if (!host || host.querySelector(selector)) return;
        ensureMediaDownloadHost(host);
        btn.addEventListener('click', onMediaDownloadClick);
        host.appendChild(btn);
    }

    function getNextVideoIndex(article) {
        if (!article) return 0;
        const current = mediaVideoIndexByArticle.get(article);
        const next = current === undefined ? 0 : current + 1;
        mediaVideoIndexByArticle.set(article, next);
        return next;
    }

    function processMediaImages() {
        const images = document.querySelectorAll('article img[src*="pbs.twimg.com/media/"]:not([data-xts-media-handled])');
        for (const img of images) {
            if (shouldSkipMediaImage(img)) {
                img.dataset.xtsMediaHandled = '1';
                continue;
            }

            if (!isTweetMediaImage(img)) {
                img.dataset.xtsMediaHandled = '1';
                continue;
            }

            if (!img.complete || img.naturalWidth === 0) {
                scheduleImageDownloadRetry(img);
                continue;
            }

            const host = getImageDownloadHost(img);
            if (!host) {
                img.dataset.xtsMediaHandled = '1';
                continue;
            }

            const isVideo = isVideoPosterImage(img);
            if (isVideo && img.closest('article')?.querySelector('video')) {
                img.dataset.xtsMediaHandled = '1';
                continue;
            }

            const selector = isVideo
                ? '.xts-media-download-btn[data-is-video="1"]'
                : '.xts-media-download-btn[data-is-video="0"]';
            if (host.querySelector(selector)) {
                img.dataset.xtsMediaHandled = '1';
                continue;
            }

            const btn = createMediaDownloadButton(isVideo);
            btn.dataset.mediaUrl = img.src;
            if (isVideo) {
                btn.dataset.posterUrl = img.src;
            }
            attachMediaDownloadButton(host, btn, selector);
            img.dataset.xtsMediaHandled = '1';
        }
    }

    function processMediaVideos() {
        const videos = document.querySelectorAll('article video:not([data-xts-media-handled])');
        for (const video of videos) {
            const host = getVideoDownloadHost(video);
            if (!host) {
                video.dataset.xtsMediaHandled = '1';
                continue;
            }

            const selector = '.xts-media-download-btn[data-is-video="1"]';
            if (host.querySelector(selector)) {
                video.dataset.xtsMediaHandled = '1';
                continue;
            }

            getNextVideoIndex(video.closest('article'));

            const btn = createMediaDownloadButton(true);
            btn.dataset.posterUrl = video.getAttribute('poster') || '';
            attachMediaDownloadButton(host, btn, selector);
            video.dataset.xtsMediaHandled = '1';
        }
    }

    function scanMediaDownloadTargets() {
        processMediaImages();
        processMediaVideos();
    }

    function initMediaDownloadButtons() {
        injectMediaDownloadStyles();

        let debounceTimer = null;
        const scheduleScan = () => {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                debounceTimer = null;
                scanMediaDownloadTargets();
            }, 500);
        };
        mediaDownloadScheduleScan = scheduleScan;

        scheduleScan();

        const observer = new MutationObserver((mutations) => {
            const relevant = mutations.some((m) => {
                if (m.type !== 'childList' || m.addedNodes.length === 0) return false;
                for (const node of m.addedNodes) {
                    if (node.nodeType !== 1) continue;
                    if (node.matches?.('article, img, video, [data-testid="tweetPhoto"], [data-testid="videoComponent"]')) {
                        return true;
                    }
                    if (node.querySelector?.('article img, video, [data-testid="tweetPhoto"], [data-testid="videoComponent"]')) {
                        return true;
                    }
                }
                return false;
            });
            if (relevant) scheduleScan();
        });
        const startObserver = () => {
            const feed = document.querySelector("main[role='main']") || document.body;
            if (!feed) {
                requestAnimationFrame(startObserver);
                return;
            }
            observer.observe(feed, { childList: true, subtree: true });
        };
        startObserver();

        debugLog('Media', 'Medien-Download-Buttons aktiv');
    }

    let mediaBooted = false;
    function bootMediaOnce() {
        if (mediaBooted) return;
        mediaBooted = true;
        initMediaDownloadButtons();
    }

    installSpaRouting();
    if (document.readyState === 'complete') {
        bootMediaOnce();
        onSpaRoute();
    } else {
        window.addEventListener('load', bootMediaOnce);
        if (document.readyState !== 'loading') onSpaRoute();
        else document.addEventListener('DOMContentLoaded', onSpaRoute);
    }
})();
