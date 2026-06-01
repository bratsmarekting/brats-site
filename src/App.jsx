import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

/* =========================================================================
   BRATS MARKETING & CONSULTING — two-page site (Home + /start)
   --------------------------------------------------------------------------
   LOGO:  Inlined as <Logo/>. fill="currentColor" → recolour via CSS `color`.
   FORM:  Search "TALLY_EMBED" to drop in the real Tally form URL (on /start).
   EMAIL: Search "hello@bratsmarketing.com" to change the contact email.
   CASES: Search "FUTURE_CASE_STUDIES" for where to add proof/case studies.
   ROUTES: "/" = home one-pager. "/start" = intake form page.
   ========================================================================= */

// ---- Logo paths (exact vector trace, single fill) ----
const LOGO_PATHS = [
  "M 729.12 109.25 L 724.12 116.25 L 720.00 124.38 L 720.00 126.50 L 718.00 130.38 L 718.00 133.50 L 717.00 134.38 L 717.00 137.50 L 716.00 138.38 L 716.00 167.50 L 717.38 168.88 L 793.50 168.88 L 794.88 166.50 L 794.00 163.75 L 794.88 162.38 L 794.88 158.38 L 797.00 154.25 L 800.25 151.00 L 804.38 148.88 L 953.50 148.88 L 957.62 151.00 L 960.88 154.25 L 963.00 158.38 L 963.00 193.50 L 961.50 195.00 L 767.38 195.00 L 766.50 196.00 L 760.38 196.00 L 759.50 197.00 L 752.38 198.00 L 749.50 200.00 L 744.38 201.00 L 733.25 208.12 L 722.12 220.25 L 717.00 230.38 L 716.00 236.50 L 715.00 237.38 L 714.00 250.50 L 713.00 251.38 L 713.00 308.50 L 714.00 309.38 L 715.00 319.50 L 716.00 320.38 L 717.00 325.50 L 719.00 328.38 L 719.00 330.50 L 726.12 340.62 L 735.25 348.75 L 738.62 350.00 L 740.38 351.88 L 742.50 351.88 L 753.38 356.88 L 757.50 356.88 L 758.38 357.88 L 762.50 357.88 L 763.38 358.88 L 771.50 358.88 L 772.38 359.88 L 1039.50 359.88 L 1041.88 357.50 L 1041.88 145.38 L 1040.88 144.50 L 1040.88 135.38 L 1039.88 134.50 L 1039.88 130.38 L 1038.88 129.50 L 1038.88 126.38 L 1037.88 125.50 L 1036.88 120.38 L 1030.75 110.25 L 1024.62 104.12 L 1012.50 96.00 L 1010.38 96.00 L 1007.50 94.00 L 1005.38 94.00 L 1001.50 92.00 L 998.38 92.00 L 993.50 90.00 L 988.38 90.00 L 987.50 89.00 L 772.38 89.00 L 771.50 90.00 L 766.38 90.00 L 765.50 91.00 L 758.38 92.00 L 757.50 93.00 L 752.38 94.00 L 749.50 96.00 L 747.38 96.00 L 737.25 102.12 Z M 792.88 265.38 L 793.88 264.50 L 793.88 261.38 L 795.00 259.25 L 799.25 255.00 L 803.38 252.88 L 960.50 252.88 L 961.00 300.50 L 804.38 301.00 L 799.25 298.88 L 793.88 292.50 L 793.88 289.38 L 792.88 288.50 Z M 673.75 106.25 L 669.62 102.12 L 663.62 98.12 L 653.50 93.00 L 643.38 91.00 L 642.50 90.00 L 636.38 90.00 L 635.50 89.00 L 613.50 89.00 L 612.88 88.25 L 611.38 89.00 L 391.38 89.00 L 390.00 90.38 L 390.00 358.50 L 392.38 359.88 L 473.50 359.88 L 475.88 358.50 L 475.88 159.38 L 478.00 154.25 L 481.25 151.00 L 485.38 148.88 L 600.50 148.88 L 604.62 151.00 L 607.88 154.25 L 609.00 156.38 L 609.00 159.50 L 610.00 160.38 L 610.00 193.50 L 611.38 194.88 L 683.50 194.88 L 685.88 191.50 L 685.88 139.38 L 684.88 138.50 L 684.88 131.38 L 683.88 130.50 L 682.88 122.38 L 680.88 119.50 L 680.88 117.38 Z M 1381.12 111.25 L 1374.00 123.38 L 1374.00 125.50 L 1372.00 129.38 L 1372.00 132.50 L 1371.00 133.38 L 1371.00 137.50 L 1370.00 138.38 L 1370.00 207.50 L 1371.00 208.38 L 1371.00 212.50 L 1372.00 213.38 L 1373.00 219.50 L 1379.12 230.62 L 1392.25 242.75 L 1395.62 244.00 L 1397.38 245.88 L 1399.50 245.88 L 1405.38 248.88 L 1408.50 248.88 L 1413.38 250.88 L 1418.50 250.88 L 1419.38 251.88 L 1430.50 251.88 L 1431.38 252.88 L 1604.50 252.88 L 1605.38 253.88 L 1607.50 253.88 L 1612.88 259.25 L 1615.00 264.38 L 1615.00 289.50 L 1612.88 294.62 L 1608.62 298.88 L 1603.50 301.00 L 1459.38 301.00 L 1454.25 298.88 L 1451.00 295.62 L 1448.88 291.50 L 1448.88 286.38 L 1446.50 284.00 L 1372.38 284.00 L 1370.00 285.38 L 1370.00 313.50 L 1371.00 314.38 L 1371.00 318.50 L 1372.00 319.38 L 1373.00 325.50 L 1377.12 333.62 L 1386.25 344.75 L 1393.25 349.75 L 1403.38 354.88 L 1405.50 354.88 L 1409.38 356.88 L 1412.50 356.88 L 1413.38 357.88 L 1417.50 357.88 L 1418.38 358.88 L 1427.50 358.88 L 1428.38 359.88 L 1634.50 359.88 L 1635.38 358.88 L 1644.50 358.88 L 1645.38 357.88 L 1649.50 357.88 L 1650.38 356.88 L 1653.50 356.88 L 1654.38 355.88 L 1659.50 354.88 L 1662.38 352.88 L 1664.50 352.88 L 1676.62 344.75 L 1680.75 340.62 L 1685.75 333.62 L 1689.88 325.50 L 1690.88 319.38 L 1691.88 318.50 L 1691.88 314.38 L 1692.88 313.50 L 1692.88 306.38 L 1693.88 305.50 L 1693.88 249.38 L 1692.88 248.50 L 1692.88 240.38 L 1691.88 239.50 L 1690.88 231.38 L 1685.75 220.25 L 1681.75 214.25 L 1670.62 204.12 L 1660.50 199.00 L 1658.38 199.00 L 1651.50 196.00 L 1640.38 195.00 L 1639.50 194.00 L 1460.38 194.00 L 1455.25 191.88 L 1451.00 187.62 L 1448.88 182.50 L 1448.88 160.38 L 1449.88 159.50 L 1449.88 156.38 L 1455.25 150.00 L 1460.38 147.88 L 1606.50 147.88 L 1607.38 148.88 L 1609.50 148.88 L 1614.88 154.25 L 1616.00 156.38 L 1616.00 162.50 L 1617.38 163.88 L 1692.50 163.88 L 1694.88 159.50 L 1694.88 141.38 L 1693.88 140.50 L 1693.88 133.38 L 1692.88 132.50 L 1691.88 124.38 L 1684.75 110.25 L 1674.62 100.12 L 1658.50 92.00 L 1655.38 92.00 L 1650.50 90.00 L 1646.38 90.00 L 1645.50 89.00 L 1635.38 89.00 L 1634.50 88.00 L 1433.38 88.00 L 1432.50 89.00 L 1423.38 89.00 L 1422.50 90.00 L 1418.38 90.00 L 1417.50 91.00 L 1410.38 92.00 L 1404.50 95.00 L 1402.38 95.00 L 1390.25 102.12 Z M 1123.38 37.00 L 1121.00 39.38 L 1121.00 88.50 L 1073.38 89.00 L 1072.00 91.38 L 1072.00 146.50 L 1074.38 148.88 L 1121.00 149.38 L 1121.00 308.50 L 1122.00 309.38 L 1122.00 316.50 L 1123.00 317.38 L 1123.00 320.50 L 1127.12 330.62 L 1131.12 336.62 L 1145.25 349.75 L 1158.38 355.88 L 1161.50 355.88 L 1166.38 357.88 L 1170.50 357.88 L 1171.38 358.88 L 1179.50 358.88 L 1180.38 359.88 L 1334.50 359.88 L 1336.50 358.88 L 1336.88 354.38 L 1337.88 353.50 L 1336.50 301.00 L 1214.38 301.00 L 1207.25 297.88 L 1203.88 293.50 L 1203.88 291.38 L 1202.88 290.50 L 1202.88 149.38 L 1334.50 148.88 L 1336.88 147.50 L 1336.88 90.38 L 1335.50 89.00 L 1204.38 89.00 L 1202.88 87.50 L 1202.88 39.38 L 1200.50 37.00 Z M 8.38 4.00 L 7.00 5.38 L 7.00 357.50 L 8.38 358.88 L 287.50 358.88 L 288.38 357.88 L 298.50 356.88 L 299.38 355.88 L 307.50 353.88 L 315.62 349.75 L 322.62 344.75 L 330.75 335.62 L 334.00 329.25 L 335.88 327.50 L 335.88 325.38 L 339.88 315.50 L 339.88 311.38 L 340.88 310.50 L 340.88 300.38 L 341.88 299.50 L 341.88 149.38 L 340.88 148.50 L 340.88 139.38 L 339.88 138.50 L 339.88 134.38 L 338.88 133.50 L 337.88 126.38 L 330.75 112.25 L 320.62 102.12 L 308.50 95.00 L 306.38 95.00 L 299.50 92.00 L 296.38 92.00 L 295.50 91.00 L 292.38 91.00 L 291.50 90.00 L 285.38 90.00 L 284.50 89.00 L 87.38 89.00 L 85.88 85.50 L 85.88 82.38 L 86.88 81.50 L 86.88 64.50 L 86.00 63.75 L 86.88 62.38 L 86.88 20.38 L 85.88 19.50 L 86.88 6.38 L 85.88 4.38 Z M 86.88 149.38 L 251.50 148.88 L 255.62 151.00 L 258.88 154.25 L 262.00 162.38 L 262.00 286.50 L 261.00 287.38 L 260.00 293.50 L 254.62 298.88 L 249.50 301.00 L 87.38 301.00 L 86.88 277.50 L 86.00 276.75 L 86.88 275.38 Z",
  "M 1552.38 448.00 L 1552.00 505.50 L 1564.88 505.50 L 1564.75 471.75 L 1565.62 471.00 L 1567.88 473.25 L 1568.00 474.50 L 1569.88 476.25 L 1570.00 477.50 L 1571.88 479.25 L 1574.00 483.50 L 1576.88 486.25 L 1579.00 490.50 L 1581.88 493.25 L 1585.00 499.50 L 1591.00 506.62 L 1592.25 506.00 L 1593.25 506.75 L 1594.50 505.88 L 1602.50 505.88 L 1602.88 448.38 L 1590.00 448.38 L 1590.12 482.12 L 1589.25 482.88 L 1584.00 475.62 L 1583.88 474.38 L 1582.00 472.62 L 1581.88 471.38 L 1580.00 469.62 L 1579.88 468.38 L 1577.00 465.62 L 1574.88 461.38 L 1572.00 458.62 L 1571.88 457.38 L 1570.00 455.62 L 1569.88 454.38 L 1568.00 452.62 L 1565.50 448.00 Z M 1500.38 448.00 L 1499.00 449.38 L 1499.00 505.50 L 1503.38 505.88 L 1504.12 506.75 L 1505.50 505.88 L 1512.50 505.88 L 1512.88 448.38 Z M 1418.38 448.00 L 1418.38 459.88 L 1433.38 459.88 L 1435.00 461.50 L 1435.00 479.38 L 1434.00 480.38 L 1434.00 488.50 L 1435.00 489.50 L 1435.00 505.50 L 1447.50 505.88 L 1447.88 460.50 L 1448.50 459.88 L 1455.50 459.88 L 1456.50 458.88 L 1464.50 458.88 L 1464.88 448.38 Z M 1358.38 448.00 L 1358.00 457.38 L 1357.00 458.38 L 1357.00 460.50 L 1358.00 461.50 L 1358.00 505.50 L 1360.38 506.88 L 1367.50 506.88 L 1368.50 505.88 L 1395.50 505.88 L 1395.50 495.00 L 1372.50 495.00 L 1371.00 493.62 L 1370.88 448.38 Z M 1270.38 448.00 L 1270.00 486.50 L 1271.00 487.50 L 1271.00 491.50 L 1272.00 492.50 L 1272.00 494.50 L 1274.00 498.50 L 1279.38 503.88 L 1283.38 505.88 L 1285.38 505.88 L 1286.38 506.88 L 1290.38 506.88 L 1291.38 507.88 L 1297.50 507.88 L 1298.50 506.88 L 1303.50 506.88 L 1306.50 504.88 L 1310.50 503.88 L 1315.88 498.50 L 1318.88 492.50 L 1318.88 488.50 L 1319.88 487.50 L 1319.88 448.38 L 1307.00 448.38 L 1307.00 456.38 L 1305.88 457.75 L 1307.00 459.50 L 1307.00 484.38 L 1306.00 485.38 L 1306.00 488.38 L 1304.88 490.62 L 1300.62 494.88 L 1293.50 496.00 L 1292.50 495.00 L 1289.50 495.00 L 1287.50 493.00 L 1286.25 492.88 L 1285.88 491.38 L 1283.88 489.38 L 1283.88 485.38 L 1282.88 484.38 L 1282.88 448.38 Z M 1103.38 448.00 L 1103.00 505.50 L 1104.38 506.88 L 1112.50 506.88 L 1113.50 505.88 L 1115.88 505.50 L 1115.75 471.75 L 1116.62 471.00 L 1119.88 475.25 L 1120.00 476.50 L 1122.88 479.25 L 1123.00 480.50 L 1124.88 482.25 L 1127.00 486.50 L 1129.88 489.25 L 1130.00 490.50 L 1131.88 492.25 L 1132.00 493.50 L 1133.88 495.25 L 1136.00 499.50 L 1138.88 502.25 L 1139.00 503.50 L 1141.38 505.88 L 1152.50 506.88 L 1153.88 505.50 L 1153.88 448.38 L 1141.00 448.38 L 1141.12 482.12 L 1140.25 482.88 L 1138.00 480.62 L 1137.88 479.38 L 1136.00 477.62 L 1133.88 473.38 L 1131.00 470.62 L 1130.88 469.38 L 1129.00 467.62 L 1128.88 466.38 L 1127.00 464.62 L 1126.88 463.38 L 1125.00 461.62 L 1122.88 457.38 L 1120.00 454.62 L 1117.88 450.38 L 1115.50 448.00 Z M 569.38 448.00 L 569.00 505.50 L 581.88 505.50 L 581.88 471.50 L 583.50 470.88 L 584.00 472.50 L 588.88 478.25 L 592.00 484.50 L 594.88 487.25 L 595.00 488.50 L 596.88 490.25 L 599.00 494.50 L 601.88 497.25 L 602.00 498.50 L 607.38 505.88 L 609.38 506.88 L 612.50 506.88 L 613.50 505.88 L 620.50 505.88 L 620.88 448.38 L 608.38 448.00 L 607.00 449.38 L 608.00 451.50 L 608.00 453.38 L 607.00 454.38 L 607.00 459.50 L 608.00 460.50 L 607.00 462.38 L 607.00 468.50 L 608.00 469.50 L 608.00 481.38 L 606.50 482.00 L 604.00 479.62 L 601.88 475.38 L 599.00 472.62 L 598.88 471.38 L 597.00 469.62 L 596.88 468.38 L 595.00 466.62 L 594.88 465.38 L 593.00 463.62 L 592.88 462.38 L 591.00 460.62 L 588.88 456.38 L 586.00 453.62 L 585.88 452.38 L 583.00 449.62 L 582.50 448.00 Z M 518.38 448.00 L 518.00 505.50 L 520.38 506.88 L 527.50 506.88 L 528.50 505.88 L 530.88 505.50 L 530.88 448.38 Z M 436.38 448.00 L 436.00 458.50 L 437.38 459.88 L 452.38 459.88 L 453.00 460.50 L 453.00 505.50 L 465.50 505.88 L 465.88 460.50 L 466.50 459.88 L 471.50 459.88 L 472.50 458.88 L 483.50 458.88 L 483.88 449.38 L 482.50 448.00 Z M 360.38 448.00 L 360.00 505.50 L 401.50 505.88 L 401.75 494.12 L 400.38 495.00 L 398.50 494.00 L 389.38 494.00 L 388.38 495.00 L 374.50 495.00 L 373.00 493.62 L 372.88 483.50 L 374.25 482.00 L 398.50 481.88 L 398.88 471.38 L 374.50 471.00 L 372.88 469.38 L 372.88 460.50 L 373.50 459.88 L 380.50 459.88 L 381.50 458.88 L 386.38 458.88 L 387.75 460.00 L 389.50 458.88 L 401.50 458.88 L 401.88 448.38 Z M 193.38 448.00 L 193.00 483.38 L 192.00 484.38 L 192.00 489.50 L 193.00 490.50 L 193.00 505.50 L 205.75 505.75 L 205.00 504.25 L 205.88 503.50 L 205.88 486.50 L 206.50 485.88 L 213.38 485.88 L 215.88 488.25 L 219.00 494.50 L 220.88 496.25 L 224.00 502.50 L 227.38 506.88 L 232.50 506.88 L 233.50 505.88 L 240.50 505.88 L 241.00 504.75 L 239.88 502.38 L 238.00 500.62 L 237.88 499.38 L 236.00 497.62 L 232.88 491.38 L 228.00 484.62 L 229.25 483.00 L 233.50 480.88 L 235.88 478.50 L 236.00 477.25 L 238.88 473.50 L 238.88 470.50 L 239.88 469.50 L 239.88 463.38 L 238.88 462.38 L 238.88 459.38 L 236.00 455.62 L 235.88 454.38 L 230.50 450.00 L 228.50 450.00 L 224.50 448.00 Z M 206.00 459.25 L 219.38 458.88 L 220.38 459.88 L 222.38 459.88 L 225.88 462.25 L 226.00 464.50 L 227.00 465.50 L 227.00 468.38 L 225.88 470.62 L 221.38 474.00 L 215.38 474.00 L 214.38 475.00 L 207.25 474.88 L 205.88 473.38 Z M 122.38 448.00 L 120.00 452.38 L 120.00 454.38 L 117.00 459.38 L 117.00 461.38 L 114.00 466.38 L 114.00 468.38 L 112.00 471.38 L 112.00 473.38 L 110.00 476.38 L 110.00 478.38 L 107.00 483.38 L 107.00 485.38 L 104.00 490.38 L 103.00 495.38 L 100.00 500.38 L 100.00 502.38 L 98.12 505.75 L 111.50 505.88 L 113.88 502.50 L 113.88 500.50 L 115.88 497.50 L 116.50 494.88 L 141.38 494.88 L 143.00 497.50 L 143.00 499.50 L 144.00 500.50 L 145.38 505.88 L 159.75 505.75 L 157.88 502.38 L 157.88 500.38 L 155.88 497.38 L 154.88 492.38 L 150.88 485.38 L 150.88 483.38 L 148.88 480.38 L 148.88 478.38 L 144.88 470.38 L 143.88 465.38 L 141.88 462.38 L 141.88 460.38 L 138.88 455.38 L 138.88 453.38 L 136.88 449.38 L 135.50 448.00 Z M 128.12 463.00 L 130.00 464.50 L 130.00 466.50 L 132.00 469.50 L 132.00 471.50 L 136.00 479.50 L 136.00 481.50 L 137.00 482.50 L 136.38 484.00 L 121.50 484.00 L 120.88 483.38 L 121.88 478.50 L 124.88 473.50 L 124.88 471.50 L 127.88 465.50 Z M 4.00 448.38 L 4.38 505.88 L 16.88 505.50 L 17.12 472.00 L 18.00 472.38 L 28.00 492.50 L 28.00 494.50 L 30.38 497.88 L 38.50 497.88 L 39.88 496.50 L 51.00 473.25 L 52.75 472.00 L 53.00 505.50 L 63.38 505.88 L 64.88 506.62 L 65.88 505.50 L 65.50 448.00 L 51.38 448.00 L 50.00 449.38 L 35.88 478.62 L 34.62 479.88 L 33.88 479.62 L 33.88 478.38 L 18.88 448.38 Z M 325.75 448.12 L 310.38 448.00 L 301.00 458.38 L 300.88 459.62 L 297.00 463.38 L 296.88 464.62 L 293.00 468.38 L 290.50 473.00 L 288.88 472.38 L 288.88 448.38 L 276.00 448.38 L 276.00 505.50 L 277.12 506.75 L 278.50 505.88 L 281.12 507.00 L 282.50 505.88 L 288.88 505.50 L 288.88 490.50 L 290.00 488.25 L 294.50 483.88 L 295.88 484.25 L 298.00 488.50 L 300.88 491.25 L 301.00 492.50 L 303.88 495.25 L 304.00 496.50 L 306.88 499.25 L 309.00 503.50 L 311.38 505.88 L 326.75 505.75 L 323.88 500.38 L 321.00 497.62 L 320.88 496.38 L 318.00 493.62 L 317.88 492.38 L 313.00 487.62 L 310.88 483.38 L 308.00 480.62 L 307.88 479.38 L 305.00 476.62 L 303.88 474.38 L 304.00 473.25 L 314.88 461.50 L 315.00 460.25 L 322.88 452.50 L 323.00 451.25 Z M 1653.38 449.00 L 1649.62 451.88 L 1648.38 452.00 L 1642.00 458.38 L 1637.00 469.38 L 1636.00 479.50 L 1637.00 480.50 L 1637.00 485.50 L 1638.00 486.50 L 1638.00 488.50 L 1641.00 494.50 L 1643.88 497.25 L 1644.00 498.50 L 1650.38 503.88 L 1654.38 504.88 L 1655.38 505.88 L 1657.38 505.88 L 1658.38 506.88 L 1662.38 506.88 L 1663.38 507.88 L 1676.50 506.88 L 1687.50 501.88 L 1690.88 498.50 L 1690.50 474.00 L 1680.50 474.00 L 1679.50 473.00 L 1676.38 473.00 L 1675.38 474.00 L 1666.00 474.38 L 1666.38 484.88 L 1677.38 484.88 L 1679.00 486.50 L 1679.00 491.38 L 1676.62 493.88 L 1674.38 494.00 L 1673.38 495.00 L 1670.38 495.00 L 1669.38 496.00 L 1664.50 496.00 L 1656.25 491.88 L 1651.88 486.38 L 1651.88 484.38 L 1650.88 483.38 L 1650.88 478.38 L 1649.88 476.50 L 1650.88 475.50 L 1650.88 470.50 L 1653.00 466.25 L 1654.88 464.50 L 1655.00 463.25 L 1656.50 462.88 L 1658.25 461.00 L 1660.50 459.88 L 1662.50 459.88 L 1663.50 458.88 L 1671.38 458.88 L 1675.62 461.00 L 1679.38 464.88 L 1681.50 464.88 L 1689.75 458.75 L 1688.88 456.38 L 1681.50 450.00 L 1677.50 448.00 L 1674.50 448.00 L 1673.50 447.00 L 1659.38 447.00 L 1658.38 448.00 Z M 1202.38 448.00 L 1198.38 450.00 L 1192.00 456.38 L 1191.00 458.38 L 1191.00 461.38 L 1190.00 462.38 L 1191.00 469.50 L 1193.00 473.50 L 1196.38 476.88 L 1197.62 477.00 L 1201.38 479.88 L 1203.38 479.88 L 1204.38 480.88 L 1206.38 480.88 L 1210.38 482.88 L 1213.38 482.88 L 1214.38 483.88 L 1216.38 483.88 L 1218.62 485.00 L 1220.88 487.25 L 1222.00 490.38 L 1220.88 492.62 L 1216.38 496.00 L 1207.50 496.00 L 1201.25 492.88 L 1196.75 488.88 L 1192.62 491.88 L 1191.38 492.00 L 1188.00 495.38 L 1188.00 496.50 L 1194.38 502.88 L 1195.62 503.00 L 1197.38 504.88 L 1199.38 504.88 L 1203.38 506.88 L 1207.38 506.88 L 1208.38 507.88 L 1214.50 507.88 L 1215.50 506.88 L 1220.50 506.88 L 1221.50 505.88 L 1223.50 505.88 L 1229.50 502.88 L 1233.88 497.50 L 1234.88 495.50 L 1234.88 483.38 L 1232.88 479.38 L 1226.50 474.00 L 1224.50 474.00 L 1221.50 472.00 L 1219.50 472.00 L 1215.50 470.00 L 1209.50 469.00 L 1205.25 466.88 L 1203.88 465.38 L 1203.88 461.50 L 1207.50 458.88 L 1217.38 458.88 L 1226.12 465.00 L 1233.88 457.50 L 1233.88 456.38 L 1229.50 452.00 L 1228.25 451.88 L 1226.50 450.00 L 1222.50 448.00 L 1219.50 448.00 L 1218.50 447.00 L 1206.38 447.00 L 1205.38 448.00 Z M 1026.38 448.00 L 1020.38 451.00 L 1012.00 459.38 L 1011.88 460.62 L 1009.00 464.38 L 1008.00 470.38 L 1007.00 471.38 L 1007.00 483.50 L 1008.00 484.50 L 1008.00 487.50 L 1013.00 496.50 L 1018.38 501.88 L 1019.62 502.00 L 1021.38 503.88 L 1025.38 505.88 L 1027.38 505.88 L 1028.38 506.88 L 1032.38 506.88 L 1033.38 507.88 L 1040.50 507.88 L 1041.50 506.88 L 1045.50 506.88 L 1046.50 505.88 L 1048.50 505.88 L 1057.50 500.88 L 1062.88 494.50 L 1065.88 488.50 L 1065.88 486.50 L 1066.88 485.50 L 1066.88 481.50 L 1067.88 480.50 L 1067.88 473.38 L 1066.88 472.38 L 1065.88 465.38 L 1063.88 461.38 L 1062.00 459.62 L 1061.88 458.38 L 1055.50 452.00 L 1054.25 451.88 L 1052.50 450.00 L 1048.50 448.00 L 1045.50 448.00 L 1044.50 447.00 L 1030.38 447.00 L 1029.38 448.00 Z M 1033.50 458.88 L 1041.38 458.88 L 1047.62 462.00 L 1051.88 467.25 L 1053.00 469.50 L 1053.00 472.50 L 1054.00 473.50 L 1054.00 479.38 L 1053.00 480.38 L 1053.00 483.38 L 1049.88 489.62 L 1044.62 493.88 L 1042.38 495.00 L 1039.38 495.00 L 1038.38 496.00 L 1036.50 496.00 L 1035.50 495.00 L 1031.50 495.00 L 1029.25 493.88 L 1026.50 491.00 L 1025.25 490.88 L 1021.88 485.38 L 1021.88 482.38 L 1020.88 481.38 L 1020.88 472.50 L 1021.88 471.50 L 1021.88 469.50 L 1024.00 465.25 L 1027.25 462.00 Z M 945.38 447.00 L 944.38 448.00 L 942.38 448.00 L 941.38 449.00 L 939.38 449.00 L 935.38 451.00 L 927.00 459.38 L 924.00 465.38 L 924.00 467.38 L 923.00 468.38 L 923.00 472.38 L 922.00 473.38 L 922.00 480.50 L 923.00 481.50 L 923.00 485.50 L 924.00 486.50 L 925.00 491.50 L 926.88 493.25 L 928.00 496.50 L 936.38 503.88 L 940.38 505.88 L 942.38 505.88 L 943.38 506.88 L 948.38 506.88 L 949.38 507.88 L 960.50 506.88 L 970.50 501.88 L 974.88 497.50 L 976.88 493.38 L 975.50 492.00 L 972.25 490.88 L 970.50 489.00 L 966.12 487.12 L 959.62 493.88 L 957.38 495.00 L 954.38 495.00 L 953.38 496.00 L 951.50 496.00 L 950.50 495.00 L 947.50 495.00 L 946.50 494.00 L 944.25 493.88 L 939.00 488.62 L 936.88 484.38 L 936.88 482.38 L 935.88 481.38 L 935.88 473.50 L 936.88 472.50 L 936.88 469.50 L 939.00 465.25 L 942.25 462.00 L 948.50 458.88 L 955.38 458.88 L 956.38 459.88 L 958.38 459.88 L 960.62 461.00 L 966.12 466.00 L 974.50 461.88 L 975.88 460.50 L 975.88 458.38 L 971.50 453.00 L 962.50 448.00 L 960.50 448.00 L 959.50 447.00 Z M 801.38 449.00 L 796.00 454.38 L 795.00 458.38 L 794.00 459.38 L 794.00 463.50 L 795.00 464.50 L 795.00 467.50 L 798.88 472.25 L 799.00 473.38 L 795.62 476.88 L 794.38 477.00 L 789.00 483.38 L 789.00 485.38 L 788.00 486.38 L 788.00 494.50 L 789.00 495.50 L 790.00 499.50 L 795.38 504.88 L 799.38 505.88 L 800.38 506.88 L 803.38 506.88 L 804.38 507.88 L 811.50 507.88 L 812.50 506.88 L 815.50 506.88 L 816.50 505.88 L 818.50 505.88 L 822.50 503.88 L 824.25 502.00 L 826.62 503.00 L 830.00 506.62 L 831.62 506.00 L 832.38 506.88 L 835.50 506.88 L 836.50 505.88 L 842.75 505.75 L 840.88 502.38 L 832.88 494.38 L 833.00 493.25 L 834.88 491.50 L 839.88 480.38 L 837.50 478.00 L 833.50 476.00 L 831.38 476.00 L 830.88 477.62 L 829.00 479.38 L 827.88 482.62 L 825.62 484.88 L 824.50 485.00 L 823.00 483.62 L 822.88 482.38 L 817.00 476.62 L 822.25 472.00 L 823.88 471.50 L 824.00 470.25 L 826.88 466.50 L 826.88 457.38 L 824.88 453.38 L 821.50 450.00 L 817.50 448.00 L 814.50 448.00 L 813.50 447.00 L 807.38 447.00 L 806.38 448.00 L 803.38 448.00 Z M 804.25 482.00 L 806.62 482.00 L 816.88 492.25 L 817.00 494.38 L 815.62 495.88 L 813.38 497.00 L 805.50 497.00 L 801.00 493.62 L 799.88 488.50 L 802.00 484.25 Z M 808.50 456.88 L 813.38 456.88 L 816.00 459.50 L 816.00 464.38 L 812.38 468.00 L 809.25 467.88 L 805.88 464.38 L 805.88 459.50 Z M 677.38 447.00 L 676.38 448.00 L 674.38 448.00 L 673.38 449.00 L 671.38 449.00 L 667.38 451.00 L 659.00 459.38 L 657.00 463.38 L 657.00 465.38 L 655.00 469.38 L 655.00 473.38 L 654.00 474.38 L 654.00 480.50 L 655.00 481.50 L 655.00 485.50 L 656.00 486.50 L 657.00 491.50 L 659.88 495.25 L 660.00 496.50 L 668.38 503.88 L 672.38 505.88 L 674.38 505.88 L 675.38 506.88 L 680.38 506.88 L 681.38 507.88 L 687.50 507.88 L 688.50 506.88 L 693.50 506.88 L 694.50 505.88 L 696.50 505.88 L 697.50 504.88 L 699.50 504.88 L 703.50 502.88 L 708.88 498.50 L 708.88 474.38 L 707.50 473.00 L 694.38 473.00 L 693.38 474.00 L 683.38 474.00 L 683.00 483.50 L 684.38 484.88 L 695.62 485.00 L 696.00 492.38 L 694.62 493.88 L 692.38 494.00 L 691.38 495.00 L 688.38 495.00 L 687.38 496.00 L 682.50 496.00 L 681.50 495.00 L 678.50 495.00 L 676.25 493.88 L 671.00 488.62 L 668.88 484.38 L 668.88 480.38 L 667.88 479.38 L 667.88 474.50 L 668.88 473.50 L 668.88 470.50 L 669.88 469.50 L 670.00 467.25 L 672.88 464.50 L 674.25 462.00 L 678.50 459.88 L 680.50 459.88 L 681.50 458.88 L 688.38 458.88 L 689.38 459.88 L 691.38 459.88 L 693.62 461.00 L 697.38 464.88 L 699.50 464.88 L 704.25 461.00 L 705.50 460.88 L 708.00 457.75 L 701.50 451.00 L 695.50 448.00 L 692.50 448.00 L 691.50 447.00 Z"
];

function Logo({ className, style, wordmarkOnly = false }) {
  // wordmarkOnly = render just the "brats" wordmark (path 0), no tagline.
  const paths = wordmarkOnly ? LOGO_PATHS.slice(0, 1) : LOGO_PATHS;
  const viewBox = wordmarkOnly ? "-1 -4 1704 372" : "0 0 1699 512";
  return (
    <svg
      className={className}
      style={style}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={wordmarkOnly ? "BRATS" : "BRATS Marketing & Consulting"}
    >
      <g fill="currentColor" stroke="none" fillRule="evenodd">
        {paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

// ---- Scroll-reveal wrapper (fade-up). Degrades to visible if no IO. ----
function Reveal({ children, delay = 0, as: Tag = "div", className = "", style = {} }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(true); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(el); } }),
      { threshold: 0.16 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={"reveal " + (shown ? "is-visible " : "") + className}
      style={{ transitionDelay: delay + "ms", ...style }}
    >
      {children}
    </Tag>
  );
}

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Scroll to top on route change.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// =========================== SHARED CHROME ===========================

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Scroll to a home section; if we're on another page, go home first.
  const goSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(id), 90);
    } else {
      scrollToId(id);
    }
  };
  const goHome = () => {
    if (location.pathname !== "/") navigate("/");
    else scrollToId("top");
  };
  return (
    <nav className={"nav " + (scrolled ? "nav--scrolled" : "")}>
      <div className="container nav__inner">
        <button className="nav__logo" onClick={goHome} aria-label="BRATS home">
          <Logo className="nav__logo-svg" />
        </button>
        <div className="nav__links">
          <button className="nav__link" onClick={() => goSection("services")}>Services</button>
          <button className="nav__link" onClick={() => goSection("process")}>How we work</button>
          <button className="nav__link" onClick={() => goSection("founder")}>About</button>
          <button className="btn btn--primary btn--sm" onClick={() => navigate("/start")}>
            Work With Us <ArrowRight size={16} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo className="footer__logo" />
          <p className="footer__acro">Brand · Reach · Analytics · Tactics · Solutions</p>
        </div>
        <div className="footer__meta">
          {/* hello@bratsmarketing.com — change the contact email here */}
          <a href="mailto:hello@bratsmarketing.com" className="footer__link">hello@bratsmarketing.com</a>
          <span className="footer__copy">© {new Date().getFullYear()} BRATS Marketing &amp; Consulting</span>
        </div>
      </div>
    </footer>
  );
}

// =========================== HOME SECTIONS ===========================

function Hero() {
  const navigate = useNavigate();
  const words = ["Brand.", "Reach.", "Analytics.", "Tactics.", "Solutions."];
  return (
    <header id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__mark">
          <Logo className="hero__mark-svg" />
        </div>

        <h1 className="hero__acro" aria-label="Brand. Reach. Analytics. Tactics. Solutions.">
          {words.map((w, i) => (
            <span
              key={w}
              className={"hero__word " + (i === words.length - 1 ? "hero__word--accent" : "")}
              style={{ animationDelay: 220 + i * 130 + "ms" }}
            >
              {w}{" "}
            </span>
          ))}
        </h1>

        <Reveal as="p" className="hero__lede" delay={120}>
          Strategy-led marketing for businesses that need it to actually perform. We find where
          your brand, marketing, sales, and customer experience fall out of sync — then build the
          strategy, systems, and execution to <span className="ul ul--teal">fix it</span>.
        </Reveal>

        <Reveal className="hero__cta" delay={220}>
          <button className="btn btn--primary" onClick={() => navigate("/start")}>
            Work With Us <ArrowRight size={18} strokeWidth={2.4} />
          </button>
          <button className="btn btn--ghost" onClick={() => scrollToId("audit")}>
            Start With an Audit
          </button>
        </Reveal>
      </div>
      <div className="hero__rule" />
    </header>
  );
}

function What() {
  return (
    <section id="what" className="section">
      <div className="container grid-2">
        <Reveal>
          <div className="eyebrow">What BRATS does</div>
          <h2 className="h2">Most marketing problems aren&rsquo;t marketing problems.</h2>
        </Reveal>
        <Reveal delay={120} className="prose">
          <p>
            They&rsquo;re alignment problems. The brand says one thing, the website says another,
            the ads chase the wrong audience, and the sales process loses the people the marketing
            worked to win.
          </p>
          <p>
            BRATS starts with diagnosis — brand position, website, social, customer journey, local
            search, sales process, content, and ad structure — then builds practical strategy and
            execution systems designed to improve performance, <span className="hl">not create dependency</span>.
          </p>
          <p className="prose__muted">
            Not posting for the sake of posting. Marketing tied to revenue, customer action, and how
            the business actually operates.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const PROOF = [
  ["20 Years", "Across brand, sales, hospitality, events & digital marketing"],
  ["National", "Brand marketing experience"],
  ["Western Canada", "Field sales leadership"],
  ["North America", "Entertainment channel marketing"],
  ["Venues", "Launch, event & experiential marketing"],
  ["University of Calgary", "Degree + digital marketing certification"],
];

function Proof() {
  return (
    <section id="proof" className="section section--carbon">
      <div className="container">
        <Reveal>
          <div className="eyebrow">Experience</div>
          <h2 className="h2">Nearly two decades of doing the work.</h2>
        </Reveal>
        <div className="proof-grid">
          {PROOF.map(([label, stmt], i) => (
            <Reveal key={label} className="proof-card" delay={i * 70}>
              <div className="proof-card__label">{label}</div>
              <div className="proof-card__stmt">{stmt}</div>
            </Reveal>
          ))}
        </div>
        {/* FUTURE_CASE_STUDIES: when real proof exists, add a logo strip or
            case-study cards directly beneath this grid. Keep it factual —
            no fabricated metrics or testimonials. */}
      </div>
    </section>
  );
}

const SERVICES = [
  ["01", "Strategy & Positioning",
   "What you are, who you are for, why anyone should care, and how the brand shows up everywhere.",
   ["Positioning & audience", "Competitive analysis", "Messaging & brand voice", "Offer clarity"]],
  ["02", "Audits & Conversion",
   "A practical diagnostic of where you lose attention, trust, traffic, leads, and sales — built for action, not generic observations.",
   ["Website & landing pages", "Social & local visibility", "Paid media structure", "Customer-journey friction"]],
  ["03", "Digital Marketing & Paid Media",
   "Strategy and execution that ties content, search, social, email, and paid spend to conversion — measured against pipeline, not vanity metrics.",
   ["Campaign & channel strategy", "Meta / Google execution", "Creative & budget pacing", "Performance optimization"]],
  ["04", "Social, Content & Creative Direction",
   "Content systems and creative direction with a point of view — standards and process that protect the brand as volume scales.",
   ["Content pillars & calendars", "Creative direction & QA", "Profile optimization", "UGC & creator strategy"]],
  ["05", "SEO, Local Discovery & Website Conversion",
   "Get found, then convert. Local search, Google Business, and websites rebuilt from brochures into conversion tools.",
   ["Local SEO & GBP", "Search visibility audit", "Website & CTA strategy", "Lead / booking flow"]],
  ["06", "Launch, Event & Experiential Marketing",
   "Direct experience creating, launching, and operating venues, events, and activations — strategy through to the room.",
   ["Launch & announcement sequencing", "Ticketing / booking strategy", "Paid amplification", "On-site & post-event content"]],
  ["07", "Systems, Reporting & Team Capability",
   "The infrastructure behind it all: workflows, action-focused reporting, and support to level up your internal team — plus email, production, AI and PR support where it fits.",
   ["Workflow & SOPs", "KPIs & reporting cadence", "Mentorship & playbooks", "Practical AI & automation"]],
];

function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">Core services</div>
          <h2 className="h2">Seven ways BRATS moves the needle.</h2>
        </Reveal>
        <div className="svc-grid">
          {SERVICES.map(([num, title, desc, items], i) => (
            <Reveal key={num} className="svc-card" delay={(i % 2) * 90}>
              <div className="svc-card__num">{num}</div>
              <h3 className="svc-card__title">{title}</h3>
              <p className="svc-card__desc">{desc}</p>
              <ul className="svc-card__list">
                {items.map((it) => (
                  <li key={it}><span className="svc-card__tick" />{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHO = [
  "Local service businesses", "Premium service businesses",
  "Hospitality, restaurants, bars & nightlife", "Professional services",
  "Health offices & clinics — dental, medical, chiro, physio, wellness",
  "Trades & home services", "Home builders, renovators & contractors",
  "Health & beauty", "Retail & consumer brands", "Lifestyle brands",
  "Startups", "Experience-led businesses",
  "Businesses preparing to launch, reposition, expand or grow",
];

function Who() {
  return (
    <section id="who" className="section section--carbon">
      <div className="container">
        <div className="grid-2">
          <Reveal>
            <div className="eyebrow">Who BRATS works with</div>
            <h2 className="h2">Built for businesses with something to prove.</h2>
            <p className="prose__muted who__note">
              The common thread isn&rsquo;t industry. It&rsquo;s ambition, complexity, and the need
              for marketing that performs.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="who-list">
              {WHO.map((w, i) => (
                <li key={w} className="who-chip" style={{ transitionDelay: i * 35 + "ms" }}>{w}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  ["Diagnose", "Find where momentum is lost across brand, web, content, paid, sales and CX."],
  ["Prioritize", "Rank the gaps by impact. Separate urgent fixes from longer-term strategy."],
  ["Build", "Strategy, positioning, creative and systems built to close the gaps."],
  ["Execute", "Put it live — campaigns, content, media and conversion work."],
  ["Measure", "Tie every effort back to revenue and customer action."],
  ["Improve", "Refine on real data. Compound the gains over time."],
];

function Process() {
  return (
    <section id="process" className="section">
      <div className="container">
        <Reveal>
          <div className="eyebrow">How BRATS works</div>
          <h2 className="h2">Strategy connected to execution.</h2>
          <p className="prose__muted process__note">
            No generic playbooks. No activity disconnected from outcomes. No reporting without
            recommendations. No systems only the consultant can understand.
          </p>
        </Reveal>
        <div className="steps">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} className="step" delay={i * 70}>
              <div className="step__num">{String(i + 1).padStart(2, "0")}</div>
              <div className="step__body">
                <h3 className="step__title">{t}</h3>
                <p className="step__desc">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="founder" className="section section--carbon">
      <div className="container grid-2 grid-2--founder">
        <Reveal>
          <div className="eyebrow">Who&rsquo;s behind it</div>
          <h2 className="h2">Senior by default, not by upsell.</h2>
        </Reveal>
        <Reveal delay={120} className="prose">
          <p>
            BRATS is led by <strong className="founder__name">Topher</strong> — a marketing
            strategist and consultant with nearly twenty years across brand strategy, hospitality,
            national brand marketing, venue launches, events, sales, and digital.
          </p>
          <p>
            A career that spans the floor, the field, the boardroom, and the campaign: national
            brand marketing, field sales leadership across Western Canada, entertainment
            channel marketing across North America, and direct experience creating, launching, and
            operating venues and experience-led businesses.
          </p>
          <p className="prose__muted">
            You work directly with a senior operator who&rsquo;s done the work — not a rotating cast
            of junior staff. (University of Calgary graduate, digital marketing certified.)
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Audit() {
  const navigate = useNavigate();
  return (
    <section id="audit" className="section">
      <div className="container">
        <Reveal className="audit">
          <div className="eyebrow eyebrow--taupe">The first step</div>
          <h2 className="h2 h2--wide">
            Most engagements begin with a <span className="ul ul--lime">focused audit</span>.
          </h2>
          <p className="audit__body">
            We identify where your brand, website, content, paid media, sales process, local
            visibility, and customer journey are losing momentum — then build the strategy to close
            the gaps. The audit isn&rsquo;t the service. It&rsquo;s the starting point for the
            strategy, execution, systems, creative, and growth work that follows.
          </p>
          <button className="btn btn--ghost" onClick={() => navigate("/start")}>
            Start With an Audit <ArrowRight size={18} strokeWidth={2.4} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

// Home closing CTA — sends people to /start. No form here (form lives on /start).
function HomeCTA() {
  const navigate = useNavigate();
  return (
    <section className="section section--intake">
      <div className="container">
        <Reveal className="intake__head">
          <div className="eyebrow eyebrow--taupe">Work with us</div>
          <h2 className="h2 h2--xl">Ready to find the gaps holding your marketing back?</h2>
          <p className="intake__sub">Tell us what&rsquo;s going on. We&rsquo;ll come prepared.</p>
        </Reveal>
        <Reveal delay={120} className="home-cta__btns">
          <button className="btn btn--primary" onClick={() => navigate("/start")}>
            Work With Us <ArrowRight size={18} strokeWidth={2.4} />
          </button>
        </Reveal>
        <Reveal delay={200} className="intake__alt">
          General questions?{" "}
          {/* hello@bratsmarketing.com — change the contact email here */}
          <a href="mailto:hello@bratsmarketing.com" className="intake__email">
            hello@bratsmarketing.com <ArrowUpRight size={15} strokeWidth={2.4} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// =========================== /start PAGE ===========================

// Fields mirrored from the brief so the page reads as intentional even
// before the Tally embed is connected.
const FORM_FIELDS = [
  "Name", "Business name", "Email", "Website or social link", "Industry",
  "What are you looking for help with?", "What feels broken right now?",
  "Main business goal", "Strategy, execution, audit, consulting — or unsure?",
  "Preferred timeline", "Budget range (optional)", "Anything we should know?",
];

function StartIntake() {
  // TALLY_EMBED: paste your Tally form's embed URL here, e.g.
  //   "https://tally.so/embed/abc123?transparentBackground=1"
  // Then set HAS_TALLY = true to render the live iframe instead of the preview.
  const TALLY_URL = "TALLY_EMBED_URL_HERE";
  const HAS_TALLY = false;

  return (
    <section id="intake" className="section section--intake section--start">
      <div className="container">
        <Reveal className="intake__head">
          <div className="eyebrow eyebrow--taupe">Work with us</div>
          <h2 className="h2 h2--xl">Tell us what&rsquo;s going on.</h2>
          <p className="intake__sub">
            Most engagements begin with a focused audit. Share a few details and we&rsquo;ll come to
            the call prepared — with a point of view on where your marketing is losing momentum.
          </p>
        </Reveal>

        <Reveal delay={120} className="intake__panel">
          {HAS_TALLY ? (
            <iframe
              title="BRATS intake form"
              src={TALLY_URL}
              className="intake__iframe"
              loading="lazy"
            />
          ) : (
            /* ===== TALLY EMBED GOES HERE =====
               Replace this placeholder block with the iframe above once your
               Tally form is live (set HAS_TALLY = true). The fields below match
               the intended form so the layout reads correctly in the meantime. */
            <div className="intake__placeholder">
              <div className="intake__placeholder-tag">Intake form — connect Tally to go live</div>
              <div className="intake__fields">
                {FORM_FIELDS.map((f) => (
                  <div key={f} className="intake__field">{f}</div>
                ))}
              </div>
            </div>
          )}
        </Reveal>

        <Reveal delay={200} className="intake__alt">
          General questions?{" "}
          {/* hello@bratsmarketing.com — change the contact email here */}
          <a href="mailto:hello@bratsmarketing.com" className="intake__email">
            hello@bratsmarketing.com <ArrowUpRight size={15} strokeWidth={2.4} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// =========================== PAGES + APP ===========================

function Home() {
  return (
    <>
      <Hero />
      <What />
      <Proof />
      <Services />
      <Who />
      <Process />
      <Founder />
      <Audit />
      <HomeCTA />
    </>
  );
}

function StartPage() {
  return <StartIntake />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="brats-root">
        <style>{CSS}</style>
        <div className="bg-grid" aria-hidden="true" />
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<StartPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

// ============================ STYLES ============================
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

.brats-root{
  --void:#050505; --carbon:#121212; --white:#F4F1EA; --teal:#C8FF00; --electric:#12D9BC;
  --lime:#C8FF00; --taupe:#D4C2AF; --steel:#A8A8A8; --body:#CFCFCF;
  --line:rgba(244,241,234,0.10);
  --maxw:1180px;
  position:relative; background:var(--void); color:var(--body);
  font-family:'Inter',system-ui,sans-serif; line-height:1.6;
  -webkit-font-smoothing:antialiased; overflow-x:hidden;
}
.brats-root *{box-sizing:border-box;}
.container{max-width:var(--maxw); margin:0 auto; padding:0 28px; position:relative; z-index:2;}

/* subtle grid background */
.bg-grid{
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size:64px 64px;
  -webkit-mask-image:radial-gradient(ellipse 90% 70% at 50% 0%, #000 30%, transparent 80%);
          mask-image:radial-gradient(ellipse 90% 70% at 50% 0%, #000 30%, transparent 80%);
  opacity:.5;
}

/* nav */
.nav{position:fixed; top:0; left:0; right:0; z-index:50; transition:background .3s, border-color .3s, backdrop-filter .3s; border-bottom:1px solid transparent;}
.nav--scrolled{background:rgba(5,5,5,.78); backdrop-filter:blur(12px); border-bottom:1px solid var(--line);}
.nav__inner{display:flex; align-items:center; justify-content:space-between; height:74px;}
.nav__logo{background:none; border:0; cursor:pointer; display:flex; align-items:center; padding:0; color:var(--white);}
.nav__logo-svg{height:26px; width:auto; display:block;}
.nav__links{display:flex; align-items:center; gap:30px;}
.nav__link{background:none;border:0;cursor:pointer;color:var(--steel);font:500 14px 'Inter';letter-spacing:.01em;transition:color .2s;}
.nav__link:hover{color:var(--white);}

/* buttons */
.btn{display:inline-flex; align-items:center; gap:9px; font-family:'Sora'; font-weight:600;
  font-size:15px; letter-spacing:.01em; padding:15px 26px; border-radius:2px; border:1px solid transparent;
  cursor:pointer; transition:background .22s, color .22s, border-color .22s, transform .22s; text-decoration:none;}
.btn--sm{padding:10px 18px; font-size:14px;}
.btn--primary{background:var(--lime); color:var(--void); border-color:var(--lime);}
.btn--primary:hover{background:var(--electric); color:var(--void); border-color:var(--electric); transform:translateY(-1px);}
.btn--ghost{background:transparent; color:var(--white); border-color:rgba(244,241,234,0.28);}
.btn--ghost:hover{border-color:var(--lime); color:var(--lime); transform:translateY(-1px);}

/* typography */
.eyebrow{font-family:'Sora'; font-weight:600; font-size:12.5px; letter-spacing:.26em; text-transform:uppercase; color:var(--teal); margin-bottom:22px;}
.eyebrow--taupe{color:var(--taupe);}
.eyebrow--hero{color:var(--taupe); margin-bottom:30px;}
.hero__mark{opacity:0; transform:translateY(16px); animation:markIn .7s cubic-bezier(.2,.7,.2,1) .05s forwards; margin-bottom:34px;}
.hero__mark-svg{height:clamp(60px,9.5vw,118px); width:auto; max-width:100%; color:var(--white); display:block;}
@keyframes markIn{to{opacity:1; transform:none;}}
.h2{font-family:'Sora'; font-weight:700; color:var(--white); font-size:clamp(28px,4vw,46px); line-height:1.08; letter-spacing:-0.015em; margin:0 0 8px;}
.h2--center{text-align:center; margin-bottom:8px;}
.h2--wide{max-width:18ch;}
.h2--xl{font-size:clamp(32px,5vw,60px); max-width:16ch; margin-left:auto; margin-right:auto;}
.hl{color:var(--white);}

/* underline draw */
.ul{position:relative; white-space:nowrap;}
.ul::after{content:""; position:absolute; left:0; right:0; bottom:-2px; height:2px; transform:scaleX(0); transform-origin:left; transition:transform .6s cubic-bezier(.2,.7,.2,1);}
.ul--teal::after{background:var(--teal);}
.ul--lime::after{background:var(--lime);}
.reveal.is-visible .ul::after, .hero__lede .ul::after{transform:scaleX(1);}
.hero__lede .ul::after{transition-delay:.5s;}

/* hero */
.hero{padding:150px 0 90px; position:relative;}
.hero__inner{max-width:960px;}
.hero__acro{font-family:'Sora'; font-weight:800; color:var(--white); letter-spacing:-0.02em;
  font-size:clamp(40px,8.5vw,104px); line-height:.98; margin:0 0 30px;}
.hero__word{display:inline-block; opacity:0; transform:translateY(28px); animation:wordUp .7s cubic-bezier(.2,.7,.2,1) forwards;}
.hero__word--accent{color:var(--lime);}
@keyframes wordUp{to{opacity:1; transform:translateY(0);}}
.hero__lede{font-size:clamp(17px,2vw,21px); color:var(--white); max-width:60ch; margin:0 0 38px; line-height:1.5;}
.hero__cta{display:flex; gap:14px; flex-wrap:wrap;}
.hero__rule{max-width:var(--maxw); margin:90px auto 0; height:1px; background:linear-gradient(90deg,var(--teal),transparent); }

/* sections */
.section{padding:104px 0; position:relative;}
.section--carbon{background:var(--carbon);}
.section--intake{padding:120px 0 110px;}
.grid-2{display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start;}
.grid-2--founder{align-items:start;}
.prose p{margin:0 0 18px; font-size:16.5px; color:var(--body);}
.prose p:last-child{margin-bottom:0;}
.prose__muted{color:var(--steel) !important;}

/* proof */
.proof-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:54px;}
.proof-card{background:var(--void); border:1px solid var(--line); border-radius:3px; padding:30px 26px; transition:border-color .3s;}
.proof-card:hover{border-color:rgba(47,99,100,.55);}
.proof-card__label{font-family:'Sora'; font-weight:600; font-size:11.5px; color:var(--lime); margin-bottom:11px; letter-spacing:0.2em; text-transform:uppercase;}
.proof-card__stmt{font-size:15.5px; color:var(--white); line-height:1.5;}

/* services */
.svc-grid{display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:54px;}
.svc-card{background:var(--carbon); border:1px solid var(--line); border-radius:3px; padding:40px 38px; transition:border-color .3s, transform .3s; position:relative; overflow:hidden;}
.svc-card::before{content:""; position:absolute; left:0; top:0; bottom:0; width:2px; background:var(--teal); transform:scaleY(0); transform-origin:top; transition:transform .4s;}
.svc-card:hover{border-color:rgba(47,99,100,.5); transform:translateY(-3px);}
.svc-card:hover::before{transform:scaleY(1);}
.svc-card__num{font-family:'Sora'; font-weight:700; font-size:13px; letter-spacing:.2em; color:var(--teal); margin-bottom:20px;}
.svc-card__title{font-family:'Sora'; font-weight:600; font-size:23px; color:var(--white); margin:0 0 14px; letter-spacing:-0.01em; line-height:1.15;}
.svc-card__desc{font-size:15.5px; color:var(--body); margin:0 0 22px; line-height:1.55;}
.svc-card__list{list-style:none; margin:0; padding:0; display:grid; grid-template-columns:1fr 1fr; gap:10px 18px;}
.svc-card__list li{display:flex; align-items:center; gap:9px; font-size:14.5px; color:var(--steel);}
.svc-card__tick{width:5px; height:5px; background:var(--teal); border-radius:50%; flex:0 0 auto;}
.svc-card:hover .svc-card__tick{background:var(--lime);}

/* who */
.who__note{margin-top:18px; max-width:60ch; font-size:16.5px;}
.who-list{list-style:none; margin:0; padding:0; display:flex; flex-wrap:wrap; gap:10px;}
.who-chip{border:1px solid var(--line); border-radius:2px; padding:11px 16px; font-size:14px; color:var(--body); background:var(--void); transition:border-color .25s, color .25s;}
.who-chip:hover{border-color:var(--taupe); color:var(--white);}

/* process */
.process__note{margin-top:18px; max-width:60ch; font-size:16.5px;}
.steps{display:grid; grid-template-columns:repeat(3,1fr); gap:1px; margin-top:54px; background:var(--line); border:1px solid var(--line);}
.step{background:var(--void); padding:34px 30px; display:flex; gap:18px; align-items:flex-start;}
.section--carbon .step{background:var(--carbon);}
.step__num{font-family:'Sora'; font-weight:800; font-size:15px; color:var(--teal); padding-top:3px;}
.step__title{font-family:'Sora'; font-weight:600; font-size:19px; color:var(--white); margin:0 0 8px;}
.step__desc{font-size:15px; color:var(--steel); margin:0; line-height:1.5;}

/* founder */
.founder__name{color:var(--white); font-weight:600;}

/* audit */
.audit{max-width:780px; margin:0 auto; text-align:center; display:flex; flex-direction:column; align-items:center;}
.audit .eyebrow{margin-bottom:22px;}
.audit__body{font-size:clamp(16px,1.7vw,19px); color:var(--body); margin:22px 0 34px; line-height:1.6; max-width:62ch;}

/* intake */
.section--intake{background:linear-gradient(180deg,var(--void),#0a0a0a);}
.intake__head{text-align:center; max-width:760px; margin:0 auto 46px;}
.intake__head .eyebrow{display:inline-block;}
.intake__sub{font-size:18px; color:var(--steel); margin:16px 0 0;}
.intake__panel{max-width:760px; margin:0 auto; background:var(--carbon); border:1px solid var(--line); border-radius:4px; padding:14px;}
.intake__iframe{width:100%; height:760px; border:0; border-radius:3px; background:transparent; display:block;}
.intake__placeholder{padding:30px 26px;}
.intake__placeholder-tag{font-family:'Sora'; font-weight:600; font-size:12px; letter-spacing:.18em; text-transform:uppercase; color:var(--taupe); margin-bottom:22px;}
.intake__fields{display:grid; grid-template-columns:1fr 1fr; gap:12px;}
.intake__field{border:1px solid var(--line); border-radius:2px; padding:15px 16px; font-size:14.5px; color:var(--steel); background:var(--void);}
.intake__field:nth-child(6),.intake__field:nth-child(7),.intake__field:nth-child(12){grid-column:1 / -1;}
.intake__alt{text-align:center; margin-top:30px; font-size:15px; color:var(--steel);}
.intake__email{color:var(--white); text-decoration:none; font-weight:500; border-bottom:1px solid var(--teal); padding-bottom:1px; display:inline-flex; align-items:center; gap:5px; transition:color .2s, border-color .2s;}
.intake__email:hover{color:var(--lime); border-color:var(--lime);}

/* footer */
.footer{border-top:1px solid var(--line); padding:48px 0; position:relative; z-index:2;}
.footer__inner{display:flex; flex-direction:column; align-items:center; text-align:center; gap:28px;}
.footer__brand{display:flex; flex-direction:column; align-items:center; gap:12px;}
.footer__logo{height:54px; width:auto; max-width:80%; color:var(--white); display:block;}
.footer__acro{font-family:'Sora'; font-size:12px; letter-spacing:.16em; color:var(--taupe); margin:0; text-transform:uppercase;}
.footer__meta{display:flex; flex-direction:column; align-items:center; gap:8px;}
.footer__link{color:var(--steel); text-decoration:none; font-size:14.5px; transition:color .2s;}
.footer__link:hover{color:var(--white);}
.footer__copy{font-size:13.5px; color:#6b6b6b;}

/* reveal */
.reveal{opacity:0; transform:translateY(22px); transition:opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);}
.reveal.is-visible{opacity:1; transform:none;}

/* responsive */
@media (max-width:860px){
  .grid-2{grid-template-columns:1fr; gap:10px;}
  .svc-grid{grid-template-columns:1fr;}
  .proof-grid{grid-template-columns:1fr 1fr;}
  .steps{grid-template-columns:1fr;}
  .nav__links .nav__link{display:none;}
  .hero{padding:124px 0 70px;}
  .section{padding:74px 0;}
}
@media (max-width:560px){
  .container{padding:0 20px;}
  .proof-grid{grid-template-columns:1fr;}
  .svc-card__list{grid-template-columns:1fr;}
  .intake__fields{grid-template-columns:1fr;}
  .footer__inner{align-items:center;}
  .footer__meta{align-items:center;}
  .hero__cta .btn{flex:1 1 auto; justify-content:center;}
}

.home-cta__btns{display:flex; justify-content:center; margin-top:36px;}
.section--start{padding-top:150px;}
`;
