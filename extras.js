// Additional destinations transcribed from the supplied destination screenshots.
// Existing full city guides remain in CITIES; these directory entries are selectable city requests.
const REGION_LABELS={popular:['Popular additions','Tambahan populer','热门新增'],northeast:['Northeast China','China Timur Laut','东北'],northwest:['Northwest China','China Barat Laut','大西北'],central:['Central China','China Tengah','华中'],north:['North China','China Utara','华北'],east_north:['Shandong & Shanxi','Shandong & Shanxi','山东／山西'],east_south:['East China','China Timur','华东'],south:['South & Southwest China','China Selatan & Barat Daya','华南／西南'],all:['All regions','Semua wilayah','全部地区']};
const EXTRA_PROVINCES=[
['Heilongjiang','黑龙江','northeast',[['Harbin','哈尔滨'],["Daxing'anling",'大兴安岭'],['Mohe','漠河'],['Yichun','伊春'],['Mudanjiang','牡丹江'],['Qiqihar','齐齐哈尔']]],
['Jilin','吉林','northeast',[['Yanji','延吉'],['Changchun','长春'],['Baishan','白山'],['Hunchun','珲春'],["Ji'an",'集安'],['Tonghua','通化']]],
['Liaoning','辽宁','northeast',[['Dalian','大连'],['Shenyang','沈阳'],['Benxi','本溪'],['Dandong','丹东'],['Panjin','盘锦'],['Jinzhou','锦州']]],
['Inner Mongolia','内蒙古','northeast',[['Hulunbuir','呼伦贝尔'],['Arxan','阿尔山'],['Ejina Banner','额济纳旗'],['Hohhot','呼和浩特'],['Ergun','额尔古纳'],['Manzhouli','满洲里']]],
['Shaanxi','陕西','northwest',[["Yan'an",'延安'],['Hanzhong','汉中'],['Yulin','榆林'],['Baoji','宝鸡'],['Xianyang','咸阳']]],
['Xinjiang','新疆','northwest',[['Urumqi','乌鲁木齐'],['Altay Prefecture','阿勒泰地区'],['Kashgar','喀什市'],['Ili','伊犁'],['Yining','伊宁市'],['Korla','库尔勒']]],
['Gansu','甘肃','northwest',[['Dunhuang','敦煌'],['Lanzhou','兰州'],['Gannan','甘南'],['Zhangye','张掖'],['Wuwei','武威'],['Tianshui','天水']]],
['Qinghai','青海','northwest',[['Xining','西宁'],['Delingha','德令哈'],['Golmud','格尔木'],['Mangya','茫崖'],['Qilian','祁连'],['Mado','玛多']]],
['Ningxia','宁夏','northwest',[['Yinchuan','银川'],['Zhongwei','中卫'],['Shizuishan','石嘴山'],['Guyuan','固原'],['Wuzhong','吴忠'],['Qingtongxia','青铜峡']]],
['Hunan','湖南','central',[['Changsha','长沙'],['Chenzhou','郴州'],['Shaoshan','韶山'],['Xiangxi Prefecture','湘西土家族苗族自治州'],['Hengyang','衡阳']]],
['Hubei','湖北','central',[['Wuhan','武汉'],['Yichang','宜昌'],['Shennongjia','神农架'],['Xiangyang','襄阳'],['Shiyan','十堰'],["Xuan'en",'宣恩']]],
['Tianjin','天津','north',[['Tianjin','天津']]],
['Henan','河南','north',[['Luoyang','洛阳'],['Zhengzhou','郑州'],['Kaifeng','开封'],['Anyang','安阳'],['Xinxiang','新乡'],['Xinyang','信阳']]],
['Hebei','河北','north',[['Qinhuangdao','秦皇岛'],['Chengde','承德'],['Handan','邯郸'],['Shijiazhuang','石家庄'],['Tangshan','唐山'],['Zhangjiakou','张家口']]],
['Shandong','山东','east_north',[['Qingdao','青岛'],['Weihai','威海'],['Yantai','烟台'],['Jinan','济南'],['Rizhao','日照'],['Qufu','曲阜']]],
['Shanxi','山西','east_north',[['Datong','大同'],['Taiyuan','太原'],['Linfen','临汾'],['Yuncheng','运城'],['Changzhi','长治'],['Jincheng','晋城']]],
['Jiangxi','江西','east_south',[['Wuyuan','婺源'],['Jingdezhen','景德镇'],['Shangrao','上饶'],['Nanchang','南昌'],['Jiujiang','九江'],['Yichun','宜春']]],
['Guangdong','广东','south',[['Guangzhou','广州']]],
['Anhui','安徽','east_south',[['Xuancheng','宣城'],['Hefei','合肥'],['She County','歙县'],['Wuhu','芜湖'],['Anqing','安庆'],["Lu'an",'六安']]]
];
const EXTRA_DESTINATIONS=EXTRA_PROVINCES.flatMap(([province,provinceZh,region,cities])=>cities.map(([name,zh])=>({id:(name+'-'+province).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''),name,zh,province,provinceZh,region})));
const EXTRA_CITY_MAP=new Map(EXTRA_DESTINATIONS.map(c=>[c.id,c]));
const EXTRA_POPULAR=['Tianjin','Harbin','Urumqi','Xining','Dunhuang','Lanzhou','Yinchuan','Dalian','Hulunbuir','Arxan','Changsha','Wuhan','Luoyang','Zhengzhou','Qinhuangdao','Qingdao','Datong','Taiyuan','Wuyuan','Jingdezhen','Guangzhou'];
function extraName(city){if(currentLang==='zh')return city.zh+(city.name==='Yichun'?`（${city.provinceZh}）`:'');return city.name+(city.name==='Yichun'?`, ${city.province}`:'')}
function extraProvince(city){return currentLang==='zh'?city.provinceZh:city.province}
function regionName(key){return REGION_LABELS[key][currentLang==='zh'?2:currentLang==='id'?1:0]}
Object.assign(TRANSLATIONS.zh.ui,{'More cities by region':'更多目的地','Choose a region or search any city above. Tap a city to add it to your trip request.':'选择地区，或在上方搜索城市。点击城市即可加入旅行咨询。','Add city to my trip':'添加城市到行程','City selected':'已选择城市','City destination':'城市目的地','City':'城市','City requests':'城市选择','selection':'项已选择','selections':'项已选择','Regions':'地区'});
Object.assign(TRANSLATIONS.id.ui,{'More cities by region':'Kota lain berdasarkan wilayah','Choose a region or search any city above. Tap a city to add it to your trip request.':'Pilih wilayah atau cari kota di atas. Ketuk kota untuk menambahkannya ke permintaan trip.','Add city to my trip':'Tambahkan kota ke trip','City selected':'Kota dipilih','City destination':'Destinasi kota','City':'Kota','City requests':'Pilihan kota','selection':'pilihan','selections':'pilihan','Regions':'Wilayah'});

Object.assign(TRANSLATIONS.zh.ui,{'Region':'地区','Explore city guides and choose the places you want to visit.':'浏览城市介绍，选择您想去的目的地。','Tap a photo to see details and add a destination to your trip.':'点击照片查看详情，并加入旅行需求。','Plan this city':'将城市加入行程'});
Object.assign(TRANSLATIONS.id.ui,{'Region':'Wilayah','Explore city guides and choose the places you want to visit.':'Jelajahi panduan kota dan pilih destinasi yang ingin kamu kunjungi.','Tap a photo to see details and add a destination to your trip.':'Ketuk foto untuk melihat detail dan menambahkannya ke tripmu.','Plan this city':'Tambahkan kota ini'});
// Each visual cue describes the generated illustration, not a verified photo of a landmark.
const EXTRA_VISUAL_CUES=`winter city architecture|arsitektur kota musim dingin|冬季城市建筑
forest and snowy river|hutan dan sungai bersalju|森林与雪河
northern lights over forest|aurora di atas hutan|森林上空的极光
forest valley|lembah berhutan|森林山谷
waterfall and autumn foliage|air terjun dan dedaunan musim gugur|瀑布与秋色
wetland cranes|burung bangau di lahan basah|湿地鹤群
colorful city streets|jalan kota yang berwarna|缤纷街景
city square and gardens|alun-alun dan taman kota|城市广场与花园
alpine crater lake|danau pegunungan|高山湖泊
riverside landscape|pemandangan tepi sungai|河畔风光
riverside stone heritage|warisan batu di tepi sungai|河畔石质古迹
forest and mountain valley|lembah hutan dan pegunungan|森林山谷
waterfront skyline|cakrawala kota di tepi laut|海滨天际线
historic palace architecture|arsitektur istana bersejarah|历史宫殿建筑
autumn mountain lake|danau pegunungan musim gugur|秋季山湖
river bridge at sunset|jembatan sungai saat senja|夕阳下的江桥
red coastal wetland|lahan basah pesisir berwarna merah|红色海岸湿地
rocky coastline|pantai berbatu|岩石海岸
grasslands and horses|padang rumput dan kuda|草原与骏马
forest lake|danau di tengah hutan|森林湖泊
golden poplar trees|pepohonan poplar keemasan|金色胡杨林
temple and city skyline|kuil dan cakrawala kota|寺庙与城市天际线
winding wetland river|sungai berkelok di lahan basah|蜿蜒的湿地河流
colorful border-city buildings|bangunan kota perbatasan yang berwarna|多彩边城建筑
historic buildings and hills|bangunan bersejarah dan perbukitan|历史建筑与山丘
flower fields and hills|ladang bunga dan perbukitan|花田与山丘
desert frontier architecture|arsitektur perbatasan gurun|沙漠边城建筑
temple complex|kompleks kuil|寺庙建筑群
old-city landscape|pemandangan kota lama|古城景观
city below snow mountains|kota berlatar pegunungan salju|雪山下的城市
snowy alpine lake|danau pegunungan bersalju|雪山湖泊
old town and market|kota lama dan pasar|古城与集市
lavender fields and mountains|ladang lavender dan pegunungan|薰衣草田与群山
traditional colorful street|jalan tradisional yang berwarna|多彩传统街道
desert and river|gurun dan sungai|沙漠与河流
desert cave architecture|arsitektur gua di gurun|沙漠石窟建筑
Yellow River bridge|jembatan Sungai Kuning|黄河大桥
grassland monastery|biara di padang rumput|草原寺院
colorful rock formations|tebing batu berwarna|彩色山岩
desert-edge pagoda|pagoda di tepi gurun|沙漠边缘的宝塔
cliffside grottoes|gua di tebing|崖壁石窟
mosque architecture|arsitektur masjid|清真寺建筑
blue salt lake|danau garam biru|蓝色盐湖
plateau highway|jalan raya dataran tinggi|高原公路
turquoise salt lake|danau garam berwarna pirus|翡翠盐湖
mountain valley|lembah pegunungan|山间河谷
high-altitude wetlands|lahan basah dataran tinggi|高原湿地
city by the mountains|kota di kaki pegunungan|山麓城市
desert dunes|bukit pasir gurun|沙丘
lake and mountain backdrop|danau berlatar pegunungan|山湖景观
green hills and fort|perbukitan hijau dan benteng|青山与古堡
riverside promenade|jalur tepi sungai|滨河步道
river gorge|ngarai sungai|河谷峡口
night skyline and river|cakrawala malam dan sungai|江畔夜景
misty lake|danau berkabut|雾中湖泊
rural hillside village|desa pedesaan di perbukitan|山村风光
old riverside village|desa lama di tepi sungai|河畔古村
mountain temple|kuil di pegunungan|山间寺庙
river and historic tower|sungai dan menara bersejarah|江畔古楼
Three Gorges river|sungai di kawasan Three Gorges|三峡江景
misty mountain forest|hutan pegunungan berkabut|云雾山林
old city walls|tembok kota lama|古城墙
mountaintop temple|kuil di puncak gunung|山顶寺庙
riverside night town|kota tepi sungai pada malam hari|河畔夜色
riverside city landmark|ikon kota di tepi sungai|河畔城市地标
stone grottoes|gua batu bersejarah|石窟群
urban skyline and river|cakrawala kota dan sungai|城市与河流
historic pavilion|paviliun bersejarah|历史亭台
historic ruins garden|taman situs bersejarah|古迹园林
mountain cliffs|tebing pegunungan|山间峭壁
tea-growing hills|perbukitan kebun teh|茶山
coastal Great Wall|Tembok Besar di tepi laut|海滨长城
lakeside palace gardens|taman istana di tepi danau|湖畔宫苑
old city gate|gerbang kota lama|古城门
modern city park|taman kota modern|现代城市公园
industrial heritage scenery|pemandangan warisan industri|工业遗产风景
mountain ski valley|lembah pegunungan bersalju|雪山滑雪谷
red-roof waterfront streets|jalan tepi laut beratap merah|红瓦海滨街道
blue coastal promenade|jalur tepi pantai biru|蓝色海滨步道
coastal skyline|cakrawala kota pesisir|海滨天际线
spring gardens|taman mata air|泉水园林
sunny beach|pantai yang cerah|阳光海滩
historic temple courtyard|halaman kuil bersejarah|古寺庭院
Buddhist cliff carvings|ukiran Buddha di tebing|崖壁佛像
temple gardens|taman kuil|寺庙园林
Yellow River waterfall|air terjun Sungai Kuning|黄河瀑布
colorful salt lake|danau garam berwarna|彩色盐湖
mountain canyon|ngarai pegunungan|山间峡谷
traditional stone village|desa tradisional berbatu|石砌古村
white-walled villages and flowers|desa berdinding putih dan bunga|白墙村落与花海
porcelain workshop|lokakarya porselen|瓷器工坊
granite peaks above clouds|puncak granit di atas awan|云海中的山峰
historic pavilion at sunset|paviliun bersejarah saat senja|夕阳下的古阁
misty mountain landscape|pegunungan berkabut|云雾山景
forest mountain stream|sungai kecil di hutan pegunungan|山林溪流
river skyline at dusk|cakrawala sungai saat senja|傍晚的珠江天际线
mountain village and river|desa pegunungan dan sungai|山村与河流
modern lakeside skyline|cakrawala kota di tepi danau|湖畔城市天际线
traditional canal town|kota kanal tradisional|传统水乡古镇
Yangtze River waterfront|tepi Sungai Yangtze|长江滨水风光
lakeside pagoda|pagoda di tepi danau|湖畔宝塔
forest river valley|lembah sungai berhutan|森林河谷`.split('\n').map(row=>row.split('|'));
EXTRA_DESTINATIONS.forEach((city,index)=>city.visualCue=EXTRA_VISUAL_CUES[index]);

Object.assign(TRANSLATIONS.zh.ui,{'Selected':'已选择','Add entire city to my trip':'将整座城市加入行程','Tap a photo to choose places for your trip.':'点击照片，选择想去的景点。'});
Object.assign(TRANSLATIONS.id.ui,{'Selected':'Dipilih','Add entire city to my trip':'Tambahkan seluruh kota ke trip','Tap a photo to choose places for your trip.':'Ketuk foto untuk memilih tempat yang ingin dikunjungi.'});

Object.assign(TRANSLATIONS.zh.ui,{'More destinations':'更多目的地'});
Object.assign(TRANSLATIONS.id.ui,{'More destinations':'Destinasi lainnya'});
