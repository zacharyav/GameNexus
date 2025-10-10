#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <fstream>
#include <sstream>
#include <limits>
#include <cstdlib>
#include <ctime>
using namespace std;

struct Profile {
    string name;
    map<string,int> scores;
};

vector<Profile> profiles;
int currentProfile = -1;

// --- Persistence ---
void loadProfiles() {
    ifstream file("profiles.txt");
    if (!file.is_open()) return;
    string line;
    while (getline(file, line)) {
        if (line.empty()) continue;
        stringstream ss(line);
        Profile p; ss >> p.name;
        string game; int score;
        while (ss >> game >> score) p.scores[game] = score;
        profiles.push_back(p);
    }
    file.close();
}

void saveProfiles() {
    ofstream file("profiles.txt");
    for (auto &p : profiles) {
        file << p.name;
        for (auto &entry : p.scores)
            file << " " << entry.first << " " << entry.second;
        file << "\n";
    }
    file.close();
}

Profile& current() { return profiles[currentProfile]; }

// --- Helpers ---
void pause() {
    cout << "\nPress Enter to continue...";
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    cin.get();
}

// --- Number Guessing ---
void numberGuessing() {
    srand(time(0));
    int target = rand()%100+1, guess;
    while (true) {
        cout << "Enter a guess (1-100): ";
        if (!(cin >> guess)) {
            cin.clear(); cin.ignore(numeric_limits<streamsize>::max(),'\n');
            cout << "Invalid input!\n"; continue;
        }
        if (guess==target) { cout<<"Correct!\n"; current().scores["NumberGuessing"]++; break; }
        else if (guess<target) cout<<"Too low!\n";
        else cout<<"Too high!\n";
    }
    pause();
}

// --- Blackjack ---
int drawCard(){ return rand()%11+1; }
void blackjack() {
    srand(time(0));
    while (true) {
        int player=drawCard()+drawCard(), dealer=drawCard()+drawCard();
        cout << "Your total: "<<player<<"\nDealer shows one card.\n";
        string choice;
        while (true) {
            if (player>21) { cout<<"You busted!\n"; break; }
            cout<<"hit/stand: "; cin>>choice;
            if (choice=="hit"||choice=="Hit") {player+=drawCard();
	    cout << "Your total: "<<player<<"\nDealer shows one card.\n";
	}
            else if (choice=="stand"||choice=="Stand") break;
        }
        while (dealer<17) dealer+=drawCard();
        cout<<"Dealer total: "<<dealer<<"\n";
        if (player>21 || (dealer<=21 && dealer>player)) cout<<"Dealer wins!\n";
        else if (dealer>21 || player>dealer){ cout<<"You win!\n"; current().scores["Blackjack"]++; }
        else cout<<"Tie!\n";
        cout<<"Play again? (y/n): "; cin>>choice; if(choice!="y") break;
    }
    pause();
}

// --- Tic Tac Toe ---
void printBoard(vector<char>& b){
    for(int i=0;i<9;i++){ cout<<b[i]; if(i%3==2) cout<<"\n"; else cout<<"|"; }
}
char checkWin(vector<char>& b){
    int w[8][3]={{0,1,2},{3,4,5},{6,7,8},{0,3,6},{1,4,7},{2,5,8},{0,4,8},{2,4,6}};
    for(auto &c:w) if(b[c[0]]!=' '&&b[c[0]]==b[c[1]]&&b[c[1]]==b[c[2]]) return b[c[0]];
    return ' ';
}
void ticTacToe(bool vsBot=false){
    vector<char> board(9,' '); char turn='X'; int moves=0;
    while(true){
        printBoard(board);
        if(char w=checkWin(board); w!=' '){
            cout<<w<<" wins!\n";
            if(w=='X') current().scores["TicTacToe"]++;
            break;
        }
        if(moves==9){ cout<<"Draw!\n"; break; }
        if(!vsBot || turn=='X'){
            int move; cout<<turn<<" move (0-8): ";
            cin>>move; if(move<0||move>8||board[move]!=' '){ cout<<"Invalid.\n"; continue; }
            board[move]=turn;
        } else {
            int m; do{m=rand()%9;}while(board[m]!=' ');
            board[m]='O'; cout<<"Bot plays "<<m<<"\n";
        }
        turn=(turn=='X'?'O':'X'); moves++;
    }
    pause();
}

// --- Spin the Wheel ---
void spinTheWheel(){
    cin.ignore(numeric_limits<streamsize>::max(),'\n');
    cout<<"Enter names separated by commas: "; string line; getline(cin,line);
    stringstream ss(line); string n; vector<string> names;
    while(getline(ss,n,',')) names.push_back(n);
    if(names.empty()){ cout<<"No names entered.\n"; pause(); return; }
    int w=rand()%names.size(); cout<<"Winner: "<<names[w]<<"!\n";
    current().scores["SpinTheWheel"]++;
    pause();
}

// --- Shadow Boxing ---
void shadowBoxing(){
    vector<string> moves={"Up","Down","Left","Right"};
    int playerMatches=0, oppMatches=0;
    srand(time(0));
    while(playerMatches<3 && oppMatches<3){
        int p; cout<<"Choose 0:Up 1:Down 2:Left 3:Right: "; cin>>p;
        int o=rand()%4; cout<<"Opponent: "<<moves[o]<<"\n";
        if(p==o){ oppMatches++; cout<<"Opponent matched! Opponent gets point("<<oppMatches<<")\n"; }
        else{
            int r; cout<<"Respond (0-3): "; cin>>r;
            if(r==o){ playerMatches++; cout<<"You matched opponent! ("<<playerMatches<<")\n"; }
        }
    }
    if(playerMatches==3){ cout<<"You win round!\n"; current().scores["ShadowBoxing"]++; }
    else cout<<"You lose round!\n";
    pause();
}

// --- Hub ---
void hub(){
    while(true){
        cout<<"\n--- GameHub --- (Profile: "<<current().name<<")\n";
        cout<<"1.Number Guessing 2.Blackjack 3.TicTacToe(PvP) 4.TicTacToe(PvB) 5.SpinTheWheel 6.ShadowBoxing 7.Scores 8.Exit\n";
        cout<<"Choose: "; int c; if(!(cin>>c)){cin.clear();cin.ignore(9999,'\n');continue;}
        switch(c){
            case 1:numberGuessing();break;
            case 2:blackjack();break;
            case 3:ticTacToe(false);break;
            case 4:ticTacToe(true);break;
            case 5:spinTheWheel();break;
            case 6:shadowBoxing();break;
            case 7:for(auto &p:profiles){ cout<<p.name<<": "; for(auto&s:p.scores) cout<<s.first<<"="<<s.second<<" "; cout<<"\n";} pause();break;
            case 8:saveProfiles();return;
        }
    }
}

int main(){
    loadProfiles();
    cout<<"Welcome to GameHub!\n";
    cout<<"Profiles:\n";
    for(size_t i=0;i<profiles.size();i++) cout<<i+1<<"."<<profiles[i].name<<"\n";
    cout<<profiles.size()+1<<".New Profile\nChoice: ";
    int c; cin>>c;
    if(c==profiles.size()+1){ cout<<"Enter name: "; string n; cin>>n; profiles.push_back({n,{}}); currentProfile=profiles.size()-1; }
    else currentProfile=c-1;
    hub();
    return 0;
}
