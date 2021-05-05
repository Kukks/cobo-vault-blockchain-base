import { UR } from '../src/QRProtocolCodec';
import { decodedSync } from './__data__/decodedSync';
import { sync } from './__data__/sync';

const qrs = [
    'ur:bytes/1-4/lpadaacfamcacygrfdfstlhkadlohkamcyctluayaeaeaeaeaeaebwsnmtsoplnttpadfeykvebnpshpgadtkodsmtflecpysfnnwlhsfdgwadatsroniofgurbzcedmfshgletdbnoedesncxgmzedylbmhdlaytkkogoryhgsgatfyidlkmtynhyzonswfzsvywendbbdswtndechyrnnersrhlgdtsfwzylzmkkwfzsvywejeaoonmhwkaxlprfzmylndsbhectdmpeetltzmyksrzofhfnhhrnaomyetwfwevlltoswsdpuoltdaclahpsswsobestjzptisfydmpsjpglsrmoesaatsmnvylulrkoiycebeuolemheofrcyuofgpfmnjspdkbmuonvttiktspiolewspscacmrlghlsjpkbnsueaykisrdtftbautnsrysapfsrqdecrpgemdiavwdtkkyljoytuyascnkblfytvlsrvwmsdibnzewecnldfnotvynbceolykfpbyimehzskbltcepknytocnurluskgshyvdfxveytfgbymtlevwlutopldsfrgawelyfdjkenrdwsfdetlahkdlkelpgwieeyttjtoesadwtivwmubzyajzuytpnbahrhrllrhslyidrynegyiewtcnlgwzmovakkenrfgysngrrtdrsafyvljzbzecaapyflcehktsyaiebgkndlaapadstpgtkimhjnsgdaykehutisdsbzfghlfgnladimjeeeatsfcamstddrtdnsswesdifzvdid',
    'ur:bytes/2-4/lpaoaacfamcacygrfdfstlhkadloimjkbywzhtaojtlndeksgauorytntniokecktnbyynwdkstdztzcptdezeldvagwbsmshekiolfpjovoesglcndyfpmkcpmdpdondwmkwpksidhknyaocwnttpwyfdzsmtenpkloetwdpfgdgtmunlynfnsaolbksobbtydsmnsnjpplswcsgsfejoktfdnyjzghcnbdtimnttpkbzaybznnhplahseorkjndphlatldcxmunesrytlprttnsggwvonsfntkinaaosgwlfeyehcltalgtspkpsfriydrdtkpcxdeaaynkkrstyjodlbdhpgdskpypdgduymocalfahaacwftnljttlvybtndmuecwztnkgimvaghbsgentwdbgrkuedpdnrepyrfdpdrjnswztjzdieomeambkurnneegwcmwmfhqdcskicklgeneotylemsvodkvlmosfloksdasahkjyvdolwfwlmehlrytygowniywdprmesrehsgvdoehyotsbldjtvdkgdwhkgetotymwjsrkospsuyollrntcwsevesepfwtlkfsfxtpgtdemubthlamtnsnlalbiabewylrytstcflgjkzcisrfpslekkgymdmepshgbwoesnfdfznbmktbwyzsuejobshknlghmntbmydnryrpzskotkynghlarkhnmuhsmucnrfdnghaotoeerktpfxolsnjzgmvejotkdtaxhdpasfdyjyrlcmuyhfahylasrfhgpegylugumwtsbslsbdemwm',
    'ur:bytes/3-4/lpaxaacfamcacygrfdfstlhkadlosbjozmvoparthehekslkfhgwltwmpsgdsewlbacxgofljkpdcnaadaahlpcpolprpdgdrfprolamheaoguiodldrenknhplglnidtafyrtfzgmglprvafthgsfprlsclcmhtfrcltefyjowphncaamjkhgcaroktkbaxgarflklgihkoknpruernkscefyztsbjodywzfehkcxvopkotdefxmhjemwrkksztdsbydkchgscatdknldjejncafldalflutbisdrwspdchcsuymdlelorhmsosdagenybbcnjyjepmmnfdlgosehfztietaxcfkgndoneorefwhgtlutjtdigujodtctqdskynatnspyytqdhkvytkjsjolkjtmwtbveahdeckfysrdrkssfghuocemnwldytnndrfledwpmbwlegyutlrfxlgbyfheyltdeiscssedyvawltnoxsgkbfhpatycwfwgwrtjtmuwycmimrlfplogumumnlypmmemkrouraxwkhhsoasasurryrdztwfjyvdrkmyrpjkwzztytvywzndtkfndelskeesmwlboemouonbmuaysojnihuronrefrlppsticlehrtlaglswwprkfrwmmnhlbbwfeevaisrhserytlzsfnvwnyfsbdplrobtbnjzjosatoisisbytpylfmhdsnmegoylntdtbgsgutbsvdplpfvwrpnyaytdtdbbsnmytyosjsldctwetkvlzsgyvdvdbyjsfevydlwyhthlmdhtgsbs',
    'ur:bytes/4-4/lpaaaacfamcacygrfdfstlhkadloltcncaskcwotnbondacsbaprtkylahcabkialgbdqzclgopfluotcndacwcwgdflpsbwbzbstegdutidjnwssajpdycmcsqzproxdttbledsotloaaidchcxjsnedncspysfwyksoniovtmesgvwdlgweylbkesgvdylmssbvlvlaersjlvlbntohefzmkfzsaollysosngoeemwglspzopmiepkonjerpuypsntjpfyjyaswnlyrneslsvwyllodputaxstoylpbksfiyfzmobaesnlfxceecjkiylgcemduecmpsgrstnnbgtdledsiejlgsnljpnspackiahgnnvyrfosuywddwvsmdiylsbwvwktmstsmymyweeyskhlztfhfzaaftlulfhntlweonfhlbdiosgamsescygyytbtfsgmuojydilgnyntqzskwnjkbegubdgamhptisdwmdmthyvlbapmimytplqzfsndpsflckesihhlvwgyhfhkostensjlrojputdpnnynsrlysrgrsebdldldbstplulncmmuiyvlfdrfihjnfmgaguctimhgdwcsrkhtatcshhteghaohtfhsgtidtjygsbnptcatlcafpvodnsobbfxdsplylkbdwzcglchjytlutdplfsgoxplbatklegatewfsnguhyspescmihhfwyfwqdhgemkkyltlosgtzcurvthhkbzodlchzcnylbknbkkknennfwvaayzmbduownneotcaasaeaeaeaeaewlceiybe',
];

describe('QRCodeProtocol UR', () => {
    it('should encode and decode QR code', () => {
        const encoder = UR.encodeProtobufByUREncoder(sync);
        const decoder = UR.decodeProtobufByURDecoder();
        const qrs = encoder.encodeWhole();
        qrs.forEach((qr) => decoder.receivePart(qr));
        expect(decoder.result().toJSON()).toStrictEqual(decodedSync);
    });
});