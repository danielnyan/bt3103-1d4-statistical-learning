let variables = new Vue({
    el: '#app',
    data: {
        variables: [{
            name: "cylinders"
        }, {
            name: "displacement"
        }, {
            name: "horsepower"
        }, {
            name: "weight"
        }, {
            name: "acceleration"
        }, {
            name: "year"
        }, {
            name: "origin"
        }],
        unselected: [{
            name: "cylinders"
        }, {
            name: "displacement"
        }, {
            name: "horsepower"
        }, {
            name: "weight"
        }, {
            name: "acceleration"
        }, {
            name: "year"
        }, {
            name: "origin"
        }],
        selected: [],
        properties: [],
        rSquared: 0,
        target: 0.81825,
        q2b: {
            solved: false
        },
        wrong_attempts: 1
    },
    methods: {
        nextPage() {
            if (this.q2b.solved || $("#prompt").css("display") !== "none") {
                window.location.href = "residual.html"
            } else {
                $("#prompt").slideDown(500);
                setTimeout(this.hidePrompt, 5000)
            }
        },
        hidePrompt() {
            $("#prompt").slideUp(500);
        },
        swapVar(name) {
            for (let index in this.unselected) {
                if (this.unselected[index].name === name) {
                    let variable = this.unselected[index];
                    this.selected.push(variable);
                    this.unselected.splice(index, 1);
                    this.submit2b();
                    return;
                }
            }
            for (let index in this.selected) {
                if (this.selected[index].name === name) {
                    let variable = this.selected[index];
                    this.unselected.push(variable);
                    this.selected.splice(index, 1);
                    this.submit2b();
                    return;
                }
            }
        },
        async submit2b(variable, operation) {
            let selectedNames = []
            for (let obj of this.selected) {
                selectedNames.push(obj.name);
            }
            selectedNames.sort();
            if (selectedNames.length === 0) {
                this.properties = [];
                this.rSquared = 0;
                return;
            }
            let index = 0;
            // I'm sorry for this. Will fix
            let results = ['', { 'rSquared': 0.6036753709670584, 'cylinders': 1.311383637099123e-80 }, { 'rSquared': 0.6473274244226872, 'displacement': 1.6606418277978345e-90 }, { 'rSquared': 0.6479507520488854, 'cylinders': 0.1943019881043726, 'displacement': 7.02376450172546e-12 }, { 'rSquared': 0.6049378688071001, 'horsepower': 7.031989029404261e-81 }, { 'rSquared': 0.6551278066119783, 'cylinders': 2.238513681834166e-13, 'horsepower': 1.191259210790015e-13 }, { 'rSquared': 0.6626034883256258, 'displacement': 2.9526620102690037e-15, 'horsepower': 1.9879486893030875e-05 }, { 'rSquared': 0.6641107630338775, 'cylinders': 0.0983305145035723, 'displacement': 0.0008072270858461362, 'horsepower': 1.1734257334229917e-05 }, { 'rSquared': 0.691842306026063, 'weight': 6.015296051436581e-102 }, { 'rSquared': 0.6959080421673769, 'cylinders': 0.013087006753516383, 'weight': 2.1113053746554598e-24 }, { 'rSquared': 0.6974190581758475, 'displacement': 0.0044447179241580365, 'weight': 7.308306915768149e-15 }, { 'rSquared': 0.6969674768152209, 'cylinders': 0.517166255159726, 'displacement': 0.12529831769185115, 'weight': 1.5011207436299344e-14 }, { 'rSquared': 0.7048656350343583, 'horsepower': 2.4884820391713816e-05, 'weight': 1.124362361137681e-26 }, { 'rSquared': 0.7053914708152264, 'cylinders': 0.19380587519262898, 'horsepower': 0.0002690363123638444, 'weight': 3.3654408074306043e-15 }, { 'rSquared': 0.7046896611177529, 'displacement': 0.38131774848294997, 'horsepower': 0.0012450628308867924, 'weight': 4.03583542582064e-13 }, { 'rSquared': 0.7046303898415267, 'cylinders': 0.33751307696859345, 'displacement': 0.9877085168225415, 'horsepower': 0.0009633307991895112, 'weight': 1.0848463706452058e-12 }, { 'rSquared': 0.1771024528489631, 'acceleration': 1.778576124804286e-18 }, { 'rSquared': 0.6039424048418587, 'cylinders': 5.755310588276524e-64, 'acceleration': 0.26178653263778306 }, { 'rSquared': 0.6467208731079879, 'displacement': 1.2149725772475243e-73, 'acceleration': 0.5657547771928151 }, { 'rSquared': 0.6472835852512195, 'cylinders': 0.20377067577823466, 'displacement': 1.2397262769527428e-11, 'acceleration': 0.6075402325739155 }, { 'rSquared': 0.6284379448157176, 'horsepower': 2.2658143340733498e-69, 'acceleration': 6.283582110321698e-07 }, { 'rSquared': 0.6673819283117558, 'cylinders': 3.451686442278934e-11, 'horsepower': 1.1802504612544741e-16, 'acceleration': 0.00010655483299305425 }, { 'rSquared': 0.6723565428828925, 'displacement': 1.7537512563116468e-12, 'horsepower': 3.919181800122194e-08, 'acceleration': 0.00043770299303161835 }, { 'rSquared': 0.6738061510028724, 'cylinders': 0.09964425346977274, 'displacement': 0.0034830811720138926, 'horsepower': 2.3140250403270313e-08, 'acceleration': 0.0004486325614760652 }, { 'rSquared': 0.6981539609651755, 'weight': 5.9103545638023005e-87, 'acceleration': 0.002645259296114365 }, { 'rSquared': 0.699377622576913, 'cylinders': 0.10880315813360067, 'weight': 2.9191723488845704e-25, 'acceleration': 0.01963462409363872 }, { 'rSquared': 0.699433192714272, 'displacement': 0.10399676324996356, 'weight': 1.5134082639888947e-15, 'acceleration': 0.058287424480058324 }, { 'rSquared': 0.6990266357662517, 'cylinders': 0.49070478479273294, 'displacement': 0.4597793246824011, 'weight': 2.928474621294274e-15, 'acceleration': 0.05665396651636813 }, { 'rSquared': 0.7041051933641558, 'horsepower': 0.003158151973177899, 'weight': 3.500486164677905e-21, 'acceleration': 0.9866462816202668 }, { 'rSquared': 0.7046713036519554, 'cylinders': 0.18744473955127333, 'horsepower': 0.005042910492903871, 'weight': 7.262731329126254e-12, 'acceleration': 0.8166149672191853 }, { 'rSquared': 0.7039525683453438, 'displacement': 0.3716583859568997, 'horsepower': 0.008848982147783107, 'weight': 2.3025450090416186e-10, 'acceleration': 0.8538764883211577 }, { 'rSquared': 0.7039062678153553, 'cylinders': 0.33301742390711253, 'displacement': 0.9926933463904917, 'horsepower': 0.006900441235748507, 'weight': 6.003378508745968e-10, 'acceleration': 0.8171046722778689 }, { 'rSquared': 0.3353278846258012, 'year': 1.0757935564158795e-36 }, { 'rSquared': 0.7136055321850238, 'cylinders': 2.4741740116811153e-73, 'year': 1.6699570799746303e-29 }, { 'rSquared': 0.7395208462107657, 'displacement': 2.330508720655274e-81, 'year': 1.2038746094600569e-27 }, { 'rSquared': 0.7409257235092215, 'cylinders': 0.07862758893580656, 'displacement': 2.7467889216897633e-10, 'year': 6.889280598216663e-28 }, { 'rSquared': 0.6838800140344343, 'horsepower': 5.656404020881801e-65, 'year': 7.99421306300927e-21 }, { 'rSquared': 0.73581899898059, 'cylinders': 4.4869749412739603e-17, 'horsepower': 1.3328776037986827e-08, 'year': 1.752500092987983e-24 }, { 'rSquared': 0.7431854030150279, 'displacement': 1.7444610063340008e-19, 'horsepower': 0.010862298661554814, 'year': 5.047329254853531e-25 }, { 'rSquared': 0.7450684917184485, 'cylinders': 0.049987645272201175, 'displacement': 0.00012131178820638859, 'horsepower': 0.00717840273848111, 'year': 3.301764680545546e-25 }, { 'rSquared': 0.807194086372353, 'weight': 8.361624441033814e-107, 'year': 9.772260160045093e-42 }, { 'rSquared': 0.8069069309563753, 'cylinders': 0.5165713640438285, 'weight': 2.618815684564196e-35, 'year': 2.1985050828925844e-40 }, { 'rSquared': 0.8066989427629532, 'displacement': 0.9523821918661137, 'weight': 3.5433637317623345e-27, 'year': 7.157863910853479e-40 }, { 'rSquared': 0.8066743171275688, 'cylinders': 0.3301815097599037, 'displacement': 0.4657274490802964, 'weight': 1.211441990721621e-26, 'year': 6.878737023314877e-40 }, { 'rSquared': 0.80683684429159, 'horsepower': 0.5966301342362879, 'weight': 1.232717451901977e-43, 'year': 8.007529068055669e-38 }, { 'rSquared': 0.8064759136341941, 'cylinders': 0.5993957715102363, 'horsepower': 0.7126481806873526, 'weight': 3.2966778571075855e-28, 'year': 2.0151674219638663e-37 }, { 'rSquared': 0.806396729724387, 'displacement': 0.7314363803813821, 'horsepower': 0.5303996969323017, 'weight': 8.841247779528347e-26, 'year': 1.373850773395797e-37 }, { 'rSquared': 0.8064339900037855, 'cylinders': 0.3005812287082577, 'displacement': 0.3390787333539159, 'horsepower': 0.471487199037265, 'weight': 4.109955752897277e-25, 'year': 1.5742111181902775e-37 }, { 'rSquared': 0.4048757193393707, 'acceleration': 3.392175371095142e-11, 'year': 1.953887106068034e-29 }, { 'rSquared': 0.7130095625451498, 'cylinders': 1.2138306958285271e-63, 'acceleration': 0.6613396236188591, 'year': 3.3670533651029835e-29 }, { 'rSquared': 0.7416201998395804, 'displacement': 1.6482689590349847e-72, 'acceleration': 0.04205033712750419, 'year': 2.0635198060953787e-28 }, { 'rSquared': 0.7428248326213961, 'cylinders': 0.09405290725639287, 'displacement': 4.4762011974979054e-11, 'acceleration': 0.050012233051732566, 'year': 1.326097228270118e-28 }, { 'rSquared': 0.7080998680316681, 'horsepower': 3.286746262476305e-62, 'acceleration': 1.6354142345266456e-08, 'year': 2.4443161848410315e-22 }, { 'rSquared': 0.7485127768771132, 'cylinders': 1.9375929673644033e-14, 'horsepower': 5.443308464100741e-13, 'acceleration': 7.6248869661529165e-06, 'year': 1.5687015516102512e-25 }, { 'rSquared': 0.7533509046069452, 'displacement': 4.28026193913584e-16, 'horsepower': 1.3377865147329159e-05, 'acceleration': 4.597186418440706e-05, 'year': 6.708240204037809e-26 }, { 'rSquared': 0.755174690191538, 'cylinders': 0.049494686958600126, 'displacement': 0.0007556693375418694, 'horsepower': 7.870950101153506e-06, 'acceleration': 4.637125168901519e-05, 'year': 4.3301196846724324e-26 }, { 'rSquared': 0.8071392941372694, 'weight': 3.4516537263125877e-97, 'acceleration': 0.34620402865528, 'year': 7.371721865857956e-40 }, { 'rSquared': 0.8067130374815183, 'cylinders': 0.7042107176633468, 'weight': 2.590802096094335e-35, 'acceleration': 0.4349711825120668, 'year': 3.123703957025185e-39 }, { 'rSquared': 0.8067872006769288, 'displacement': 0.5886514933385264, 'weight': 1.824299979465905e-26, 'acceleration': 0.2785950410904955, 'year': 3.0052382765513064e-39 }, { 'rSquared': 0.80678410114095, 'cylinders': 0.31944189604355916, 'displacement': 0.285827123850932, 'weight': 5.257232314527063e-26, 'acceleration': 0.27007007383345716, 'year': 2.896814582187902e-39 }, { 'rSquared': 0.8066601099470618, 'horsepower': 0.8448257908176696, 'weight': 1.008856866715975e-36, 'acceleration': 0.4222823841687514, 'year': 7.178572381360667e-38 }, { 'rSquared': 0.8062379428147272, 'cylinders': 0.6923315759080808, 'horsepower': 0.82128705099701, 'weight': 7.06076868085137e-24, 'acceleration': 0.46928159195260266, 'year': 1.9678407256360643e-37 }, { 'rSquared': 0.8062894064450694, 'displacement': 0.610824365629748, 'horsepower': 0.9409526447345115, 'weight': 2.9437704715694793e-22, 'acceleration': 0.3759897820733191, 'year': 1.166529952985322e-37 }, { 'rSquared': 0.8062826441922383, 'cylinders': 0.3212168678416338, 'displacement': 0.29733180488897737, 'horsepower': 0.9774501010042393, 'weight': 1.4161898893540533e-21, 'acceleration': 0.40383033028432136, 'year': 1.4104275872678224e-37 }, { 'rSquared': 0.31771596671683666, 'origin': 1.8110801807967613e-34 }, { 'rSquared': 0.6250673049631927, 'cylinders': 9.74212995303584e-53, 'origin': 2.0428285631521645e-06 }, { 'rSquared': 0.6544322389323465, 'displacement': 1.2021227850169186e-59, 'origin': 0.002845538143976441 }, { 'rSquared': 0.6555572517310426, 'cylinders': 0.13266724948017347, 'displacement': 5.907199437353544e-09, 'origin': 0.0020980724127510897 }, { 'rSquared': 0.6603080744700855, 'horsepower': 4.242425502676794e-61, 'origin': 1.1254481167907765e-14 }, { 'rSquared': 0.6807455587097906, 'cylinders': 5.608723344233794e-07, 'horsepower': 1.7819380553277467e-15, 'origin': 2.7068055181417486e-08 }, { 'rSquared': 0.678599018363905, 'displacement': 2.161852942602919e-06, 'horsepower': 6.905200156787997e-08, 'origin': 8.516942284772405e-06 }, { 'rSquared': 0.6814128715527932, 'cylinders': 0.03602077035777362, 'displacement': 0.17897210591059456, 'horsepower': 2.3797434881360146e-08, 'origin': 3.6549502873743893e-06 }, { 'rSquared': 0.7004287043331969, 'weight': 9.707839059743571e-72, 'origin': 0.000538847989293296 }, { 'rSquared': 0.7030593922019321, 'cylinders': 0.0356180313465329, 'weight': 1.191459203320957e-21, 'origin': 0.0013898684936181408 }, { 'rSquared': 0.7031054707955409, 'displacement': 0.034385438491231664, 'weight': 1.0364958466102683e-14, 'origin': 0.003858891128627293 }, { 'rSquared': 0.7028952837571173, 'cylinders': 0.3948695461926295, 'displacement': 0.375958633326815, 'weight': 2.4413421871221947e-14, 'origin': 0.0033013814578195977 }, { 'rSquared': 0.7167486351322596, 'horsepower': 1.8892935410182218e-06, 'weight': 2.90293193054601e-17, 'origin': 3.894298029418156e-05 }, { 'rSquared': 0.7163087070985898, 'cylinders': 0.5283319960929125, 'horsepower': 1.5791322354795914e-05, 'weight': 8.511008941020081e-12, 'origin': 7.858421979471603e-05 }, { 'rSquared': 0.7162663469248653, 'displacement': 0.5598917940141075, 'horsepower': 1.6796966861994177e-05, 'weight': 2.3390878665779793e-12, 'origin': 4.9845690932916087e-05 }, { 'rSquared': 0.7169503021788135, 'cylinders': 0.16499865302564545, 'displacement': 0.17144663287053205, 'horsepower': 9.156883424061215e-06, 'weight': 8.739425460020871e-12, 'origin': 2.9938239098951196e-05 }, { 'rSquared': 0.4126705596782072, 'acceleration': 1.4105663715057789e-14, 'origin': 1.4794425779644898e-30 }, { 'rSquared': 0.6267941232211826, 'cylinders': 2.52085748871569e-40, 'acceleration': 0.09507631984999713, 'origin': 9.501841033841078e-07 }, { 'rSquared': 0.653542448592634, 'displacement': 1.2899950204321193e-46, 'acceleration': 0.9754282359259766, 'origin': 0.003449544102135598 }, { 'rSquared': 0.6546704287137295, 'cylinders': 0.13294069639663728, 'displacement': 2.5775125789975575e-08, 'acceleration': 0.9522047770898894, 'origin': 0.002449714844198515 }, { 'rSquared': 0.674088669567826, 'horsepower': 8.756220457581657e-52, 'acceleration': 3.649762159505472e-05, 'origin': 6.15834837735475e-13 }, { 'rSquared': 0.690047217821554, 'cylinders': 6.276636321189134e-06, 'horsepower': 1.4523466688665364e-17, 'acceleration': 0.0004234716954672555, 'origin': 1.0525321018782682e-07 }, { 'rSquared': 0.6873543135092164, 'displacement': 3.62468514283801e-05, 'horsepower': 1.786259076945579e-10, 'acceleration': 0.0006344122146323724, 'origin': 1.2358008377007517e-05 }, { 'rSquared': 0.6900535846070683, 'cylinders': 0.03722381563324213, 'displacement': 0.31602349615446196, 'horsepower': 6.47840296802953e-11, 'acceleration': 0.0006604453498440251, 'origin': 5.3893797086236755e-06 }, { 'rSquared': 0.7075000764640083, 'weight': 6.363847890894508e-61, 'acceleration': 0.0013638285119313954, 'origin': 0.00028213883721345874 }, { 'rSquared': 0.7076786397368833, 'cylinders': 0.26673885186844026, 'weight': 1.545438865516045e-22, 'acceleration': 0.007894989682576084, 'origin': 0.0005860033364590914 }, { 'rSquared': 0.7070297998740814, 'displacement': 0.539476484885103, 'weight': 4.963957103709643e-16, 'acceleration': 0.013214036729106864, 'origin': 0.000966047721378534 }, { 'rSquared': 0.7069431648314333, 'cylinders': 0.3472629225087357, 'displacement': 0.8654253270077477, 'weight': 1.0838763218963893e-15, 'acceleration': 0.01217123421616496, 'origin': 0.0007864087826678294 }, { 'rSquared': 0.7160837542645931, 'horsepower': 0.0004049046569193856, 'weight': 1.7084153762767623e-13, 'acceleration': 0.762600420397268, 'origin': 3.798475357713744e-05 }, { 'rSquared': 0.7156940436611324, 'cylinders': 0.4936183436032038, 'horsepower': 0.0006198392153551283, 'weight': 4.740786271563246e-09, 'acceleration': 0.6863471524320945, 'origin': 7.576493568687932e-05 }, { 'rSquared': 0.7155616653173924, 'displacement': 0.59074980311158, 'horsepower': 0.0004314787055885156, 'weight': 9.386200314524817e-10, 'acceleration': 0.8392072800752879, 'origin': 5.078076790885101e-05 }, { 'rSquared': 0.7162697763482662, 'cylinders': 0.16196129213770707, 'displacement': 0.1825392368320574, 'horsepower': 0.00024720536287008014, 'weight': 3.3342025288997222e-09, 'acceleration': 0.7854904717113976, 'origin': 3.032602333347481e-05 }, { 'rSquared': 0.5533867026816812, 'year': 6.652771612964347e-38, 'origin': 1.1041376608679433e-35 }, { 'rSquared': 0.7373473408033716, 'cylinders': 7.144106417568958e-47, 'year': 4.5864969231260106e-32, 'origin': 4.1948975767857304e-09 }, { 'rSquared': 0.750710690976079, 'displacement': 2.750612840327199e-51, 'year': 1.4082852601485362e-29, 'origin': 2.1949794473638898e-05 }, { 'rSquared': 0.752849801596766, 'cylinders': 0.03748514391993333, 'displacement': 7.389407132618238e-07, 'year': 5.8488444136200274e-30, 'origin': 1.1716817755111423e-05 }, { 'rSquared': 0.7409383284668136, 'horsepower': 4.897452817576068e-48, 'year': 7.363659826152544e-25, 'origin': 9.631807741076204e-19 }, { 'rSquared': 0.7622864812896064, 'cylinders': 4.879897796031207e-09, 'horsepower': 3.1853487067258197e-10, 'year': 7.915053231751128e-27, 'origin': 1.0110010952799672e-10 }, { 'rSquared': 0.759870106824233, 'displacement': 3.648780893416686e-08, 'horsepower': 8.401247868387255e-05, 'year': 1.5393971317825244e-26, 'origin': 2.076499799735822e-07 }, { 'rSquared': 0.7631238068050932, 'cylinders': 0.012373360496738407, 'displacement': 0.12466549893655095, 'horsepower': 3.084031688531556e-05, 'year': 6.946760742105218e-27, 'origin': 6.150277779468537e-08 }, { 'rSquared': 0.816040731913328, 'weight': 5.9395166623571915e-77, 'year': 3.2319310570869964e-43, 'origin': 1.1781828590141954e-05 }, { 'rSquared': 0.8155716443397432, 'cylinders': 0.9088169276760772, 'weight': 8.656648870567704e-32, 'year': 3.7588042977775345e-42, 'origin': 1.496324459140746e-05 }, { 'rSquared': 0.8162176150241424, 'displacement': 0.24194365817470834, 'weight': 1.1407131769971155e-27, 'year': 1.9591560113989037e-42, 'origin': 5.9182863846898265e-06 }, { 'rSquared': 0.8165646442503642, 'cylinders': 0.18891889007274848, 'displacement': 0.07932697591768288, 'weight': 4.919004351316571e-27, 'year': 1.507084578292008e-42, 'origin': 4.048650835800914e-06 }, { 'rSquared': 0.8161763977111364, 'horsepower': 0.2574232918473426, 'weight': 6.6608183617303746e-31, 'year': 1.912376129763914e-38, 'origin': 7.1527567334400345e-06 }, { 'rSquared': 0.8157238836187541, 'cylinders': 0.8237547917212737, 'horsepower': 0.25135383102282466, 'weight': 2.3284582922400542e-23, 'year': 2.833802033811085e-38, 'origin': 8.270860346192909e-06 }, { 'rSquared': 0.8176929155967583, 'displacement': 0.04064075858670029, 'horsepower': 0.042769640360939505, 'weight': 4.022057870005599e-25, 'year': 3.4291561028345315e-39, 'origin': 8.804499884083599e-07 }, { 'rSquared': 0.8183821715022082, 'cylinders': 0.11723623731894325, 'displacement': 0.010287331978594862, 'horsepower': 0.028031208753773188, 'weight': 3.1285474016771556e-24, 'year': 3.283725043353927e-39, 'origin': 4.4338672136104644e-07 }, { 'rSquared': 0.5884199619099353, 'acceleration': 1.1019911246574216e-08, 'year': 4.893166199925328e-32, 'origin': 3.735652107579904e-33 }, { 'rSquared': 0.7366865256644362, 'cylinders': 1.186691534587453e-39, 'acceleration': 0.8713276763107489, 'year': 2.1978072532268592e-31, 'origin': 4.780370383381041e-09 }, { 'rSquared': 0.7512127507203703, 'displacement': 1.930399042302501e-44, 'acceleration': 0.18256684914731094, 'year': 6.794312893203043e-30, 'origin': 7.74412275201166e-05 }, { 'rSquared': 0.7531635202245046, 'cylinders': 0.04464275428022959, 'displacement': 3.580255457002194e-07, 'acceleration': 0.22267348076328042, 'year': 3.2783847466595104e-30, 'origin': 4.12043392745209e-05 }, { 'rSquared': 0.7552138568604192, 'horsepower': 8.279132251941816e-46, 'acceleration': 1.7022000113784991e-06, 'year': 4.29991593039625e-26, 'origin': 9.682178416663129e-17 }, { 'rSquared': 0.771968142615532, 'cylinders': 1.0232691636312513e-07, 'horsepower': 5.74600425228072e-14, 'acceleration': 3.6853089987039834e-05, 'year': 8.891135405358595e-28, 'origin': 4.83947885425778e-10 }, { 'rSquared': 0.7690157646815506, 'displacement': 1.3362832469565639e-06, 'horsepower': 5.254523521718491e-08, 'acceleration': 6.44675677203471e-05, 'year': 2.0166239740887936e-27, 'origin': 2.9334107840138064e-07 }, { 'rSquared': 0.7721513749426013, 'cylinders': 0.01239998812048044, 'displacement': 0.25303064004801495, 'horsepower': 1.7311822123951932e-08, 'acceleration': 6.546268631360912e-05, 'year': 8.916873361220473e-28, 'origin': 8.765229585086172e-08 }, { 'rSquared': 0.8162030082274072, 'weight': 5.897020644638585e-70, 'acceleration': 0.24729585780584215, 'year': 3.60766461570108e-41, 'origin': 9.53571178874792e-06 }, { 'rSquared': 0.8157592046320505, 'cylinders': 0.7947280381540026, 'weight': 5.212238157609319e-32, 'acceleration': 0.23846236720410546, 'year': 8.186516416108805e-41, 'origin': 1.0190031912400916e-05 }, { 'rSquared': 0.8175490778930626, 'displacement': 0.05031029790528093, 'weight': 4.790325158187097e-28, 'acceleration': 0.05123884188045771, 'year': 8.029997253912349e-42, 'origin': 1.5451594003353833e-06 }, { 'rSquared': 0.8179821739181948, 'cylinders': 0.16682916888308746, 'displacement': 0.01730825023657317, 'weight': 1.62520259433508e-27, 'acceleration': 0.046036804426109586, 'year': 6.078125513329552e-42, 'origin': 9.868476410280081e-07 }, { 'rSquared': 0.8158201241610861, 'horsepower': 0.6586407246465176, 'weight': 7.006688680678902e-26, 'acceleration': 0.6163799224585643, 'year': 2.1959776507097096e-38, 'origin': 9.01993157098583e-06 }, { 'rSquared': 0.8153866997398562, 'cylinders': 0.7596016119958298, 'horsepower': 0.6384347186267425, 'weight': 1.2210758682262758e-19, 'acceleration': 0.5873504560857499, 'year': 3.2989281947760843e-38, 'origin': 9.572708694726256e-06 }, { 'rSquared': 0.8175962296925172, 'displacement': 0.02975715090696846, 'horsepower': 0.29497184559691775, 'weight': 9.635206834947906e-22, 'acceleration': 0.37303087300779847, 'year': 2.9376742538979057e-39, 'origin': 9.040320762514532e-07 }, { 'rSquared': 0.8182237705835792, 'cylinders': 0.12779646755775598, 'displacement': 0.008444649481626123, 'horsepower': 0.2196328232263329, 'weight': 7.87495333321151e-21, 'acceleration': 0.41547801783725846, 'year': 3.055982581075516e-39, 'origin': 4.665680973942882e-07 }];
            if (selectedNames.includes("cylinders"))
                index += 1;
            if (selectedNames.includes("displacement"))
                index += 2;
            if (selectedNames.includes("horsepower"))
                index += 4;
            if (selectedNames.includes("weight"))
                index += 8;
            if (selectedNames.includes("acceleration"))
                index += 16;
            if (selectedNames.includes("year"))
                index += 32;
            if (selectedNames.includes("origin"))
                index += 64;

            let selected = results[index];
            this.rSquared = selected.rSquared;
            this.properties = [];
            for (let prop in selected) {
                if (prop === "rSquared")
                    continue;
                this.properties.push({
                    name: prop,
                    val: selected[prop]
                });
            }
            if (this.rSquared > this.target) {
                this.q2b.solved = true;
                setProgress("2b");
            }
        },
        initialise(e) {
            Vue.nextTick(() => {
                e.previousParent = e.$el.parentElement;
            })
        },
    },
    mounted() {
        this.wrong_attempts += 1;
        retrieveProgress().then((result) => {
            if (result.includes("2b")) {
                this.q2b.solved = true;
            }
        });
    }
});