export interface Upazila {
  name: string;
}

export interface District {
  name: string;
  upazilas: string[];
}

export interface Division {
  name: string;
  districts: District[];
}

export const bangladeshLocations: Division[] = [
  {
    name: "Dhaka",
    districts: [
      {
        name: "Dhaka",
        upazilas: [
          "Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar",
          "Demra", "Gulshan", "Hazaribagh", "Kadamtali", "Kafrul",
          "Kalabagan", "Kamrangirchar", "Khilgaon", "Khilkhet",
          "Lalbagh", "Mirpur", "Mohammadpur", "Motijheel", "Pallabi",
          "Ramna", "Rayer Bazar", "Sabujbagh", "Shah Ali", "Shahjahanpur",
          "Shyampur", "Sutrapur", "Tejgaon", "Turag", "Uttara"
        ]
      },
      {
        name: "Gazipur",
        upazilas: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur", "Tongi"]
      },
      {
        name: "Narayanganj",
        upazilas: ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"]
      },
      {
        name: "Manikganj",
        upazilas: ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shivalaya", "Singair"]
      },
      {
        name: "Munshiganj",
        upazilas: ["Gazaria", "Louhajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"]
      },
      {
        name: "Narsingdi",
        upazilas: ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"]
      },
      {
        name: "Tangail",
        upazilas: ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"]
      },
      {
        name: "Kishoreganj",
        upazilas: ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"]
      },
      {
        name: "Faridpur",
        upazilas: ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"]
      },
      {
        name: "Gopalganj",
        upazilas: ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"]
      },
      {
        name: "Madaripur",
        upazilas: ["Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"]
      },
      {
        name: "Rajbari",
        upazilas: ["Baliakandi", "Goalandaghat", "Kalukhali", "Pangsha", "Rajbari Sadar"]
      },
      {
        name: "Shariatpur",
        upazilas: ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zanjira"]
      }
    ]
  },
  {
    name: "Chittagong",
    districts: [
      {
        name: "Chittagong",
        upazilas: [
          "Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari",
          "Hathazari", "Karnaphuli", "Lohagara", "Mirsharai", "Patiya",
          "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda",
          "Chittagong City"
        ]
      },
      {
        name: "Cox's Bazar",
        upazilas: ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"]
      },
      {
        name: "Feni",
        upazilas: ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Parshuram", "Sonagazi", "Fulgazi"]
      },
      {
        name: "Comilla",
        upazilas: ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Comilla Sadar", "Daudkandi", "Debidwar", "Homna", "Laksam", "Lalmai", "Meghna", "Muradnagar", "Nangalkot", "Titas"]
      },
      {
        name: "Noakhali",
        upazilas: ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat", "Noakhali Sadar", "Senbagh", "Subarnachar"]
      },
      {
        name: "Lakshmipur",
        upazilas: ["Kamalnagar", "Lakshmipur Sadar", "Ramganj", "Ramgati", "Roypur"]
      },
      {
        name: "Chandpur",
        upazilas: ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"]
      },
      {
        name: "Brahmanbaria",
        upazilas: ["Akhaura", "Ashuganj", "Bancharampur", "Bijoynagar", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"]
      },
      {
        name: "Khagrachhari",
        upazilas: ["Dighinala", "Guimara", "Khagrachhari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"]
      },
      {
        name: "Rangamati",
        upazilas: ["Baghaichhari", "Barkal", "Belaichhari", "Juraichhari", "Kaptai", "Kaukhali", "Langadu", "Naniarchar", "Rajasthali", "Rangamati Sadar"]
      },
      {
        name: "Bandarban",
        upazilas: ["Ali kadam", "Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"]
      }
    ]
  },
  {
    name: "Rajshahi",
    districts: [
      {
        name: "Rajshahi",
        upazilas: ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Rajshahi Sadar", "Tanore"]
      },
      {
        name: "Bogura",
        upazilas: ["Adamdighi", "Bogura Sadar", "Dhunat", "Dhupchanchia", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Shajahanpur", "Sherpur", "Shibganj", "Sonatala"]
      },
      {
        name: "Chapainawabganj",
        upazilas: ["Bholahat", "Chapainawabganj Sadar", "Gomastapur", "Nachole", "Shibganj"]
      },
      {
        name: "Joypurhat",
        upazilas: ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"]
      },
      {
        name: "Naogaon",
        upazilas: ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mahadebpur", "Mohadevpur", "Naogaon Sadar", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar"]
      },
      {
        name: "Natore",
        upazilas: ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Natore Sadar", "Singra"]
      },
      {
        name: "Pabna",
        upazilas: ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Pabna Sadar", "Santhia", "Sujanagar"]
      },
      {
        name: "Sirajganj",
        upazilas: ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Sirajganj Sadar", "Tarash", "Ullapara"]
      }
    ]
  },
  {
    name: "Khulna",
    districts: [
      {
        name: "Khulna",
        upazilas: ["Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsa", "Terokhada", "Khulna City"]
      },
      {
        name: "Bagerhat",
        upazilas: ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"]
      },
      {
        name: "Satkhira",
        upazilas: ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar", "Shyamnagar", "Tala"]
      },
      {
        name: "Jessore",
        upazilas: ["Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Jessore Sadar", "Keshabpur", "Manirampur", "Sharsha"]
      },
      {
        name: "Jhenaidah",
        upazilas: ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa"]
      },
      {
        name: "Magura",
        upazilas: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"]
      },
      {
        name: "Narail",
        upazilas: ["Kalia", "Lohagara", "Narail Sadar"]
      },
      {
        name: "Kushtia",
        upazilas: ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar", "Mirpur"]
      },
      {
        name: "Chuadanga",
        upazilas: ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"]
      },
      {
        name: "Meherpur",
        upazilas: ["Gangni", "Meherpur Sadar", "Mujibnagar"]
      }
    ]
  },
  {
    name: "Barisal",
    districts: [
      {
        name: "Barisal",
        upazilas: ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barisal Sadar", "Gaurnadi", "Hizla", "Mehendiganj", "Muladi", "Uzirpur"]
      },
      {
        name: "Bhola",
        upazilas: ["Bhola Sadar", "Borhanuddin", "Charfasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"]
      },
      {
        name: "Jhalokati",
        upazilas: ["Jhalokati Sadar", "Kanthalia", "Nalchity", "Rajapur"]
      },
      {
        name: "Patuakhali",
        upazilas: ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"]
      },
      {
        name: "Pirojpur",
        upazilas: ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Pirojpur Sadar", "Zianagar"]
      },
      {
        name: "Barguna",
        upazilas: ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Pathorghata", "Taltali"]
      }
    ]
  },
  {
    name: "Sylhet",
    districts: [
      {
        name: "Sylhet",
        upazilas: ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Dakshin Surma", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Osmaninagar", "Sylhet Sadar", "South Surma", "Zakiganj"]
      },
      {
        name: "Moulvibazar",
        upazilas: ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar", "Rajnagar", "Sreemangal"]
      },
      {
        name: "Habiganj",
        upazilas: ["Ajmiriganj", "Baniachong", "Bahubal", "Chunarughat", "Habiganj Sadar", "Lakhai", "Madhabpur", "Nabiganj", "Shayestaganj"]
      },
      {
        name: "Sunamganj",
        upazilas: ["Bishwamvarpur", "Chhatak", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Sunamganj Sadar", "Tahirpur"]
      }
    ]
  },
  {
    name: "Rangpur",
    districts: [
      {
        name: "Rangpur",
        upazilas: ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Rangpur Sadar", "Taraganj"]
      },
      {
        name: "Dinajpur",
        upazilas: ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Dinajpur Sadar", "Fulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur"]
      },
      {
        name: "Gaibandha",
        upazilas: ["Fulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur", "Saghata", "Sundarganj"]
      },
      {
        name: "Kurigram",
        upazilas: ["Bhurungamari", "Char Rajibpur", "Chilmari", "Kurigram Sadar", "Nageshwari", "Phulbari", "Rajarhat", "Raumari", "Ulipur"]
      },
      {
        name: "Lalmonirhat",
        upazilas: ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"]
      },
      {
        name: "Nilphamari",
        upazilas: ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar", "Saidpur"]
      },
      {
        name: "Panchagarh",
        upazilas: ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"]
      },
      {
        name: "Thakurgaon",
        upazilas: ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"]
      }
    ]
  },
  {
    name: "Mymensingh",
    districts: [
      {
        name: "Mymensingh",
        upazilas: ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Mymensingh Sadar", "Muktagachha", "Nandail", "Phulpur", "Trishal"]
      },
      {
        name: "Jamalpur",
        upazilas: ["Baksiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"]
      },
      {
        name: "Netrokona",
        upazilas: ["Atpara", "Barhatta", "Durgapur", "Kendua", "Khaliajuri", "Kalmakanda", "Madan", "Mohanganj", "Netrokona Sadar", "Purbadhala"]
      },
      {
        name: "Sherpur",
        upazilas: ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"]
      }
    ]
  }
];

export function getDistricts(divisionName: string): District[] {
  const division = bangladeshLocations.find(d => d.name === divisionName);
  return division ? division.districts : [];
}

export function getUpazilas(divisionName: string, districtName: string): string[] {
  const districts = getDistricts(divisionName);
  const district = districts.find(d => d.name === districtName);
  return district ? district.upazilas : [];
}

export function getDivisions(): string[] {
  return bangladeshLocations.map(
    (division) => division.name
  );
}
