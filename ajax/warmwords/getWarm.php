<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);

$news = array(
	array('content'=>'他人失去了信心，她却下定了决心。','date'=>'2017-11-11'),
	array('content'=>'现在，晒晒所有不值一提的迷茫。','date'=>'2017-11-12'),
	array('content'=>'想牵你的手，从心动，到古稀~','date'=>'2017-11-13'),
	array('content'=>'生活中没有理所当然，只有心甘情愿。','date'=>'2017-11-14'),
	array('content'=>'累了，难过了，就蹲下来，给自己一个拥抱。','date'=>'2017-11-17'),
	array('content'=>' 问世间情为何物，只不过是互相耽误。','date'=>'2017-11-14'),
	array('content'=>'优雅并不是训练出来的，而是一种阅历。','date'=>'2017-11-1'),
	array('content'=>'总有一条路，会让你心动；总有一扇窗，会让你驻足。','date'=>'2017-9-6'),
	array('content'=>'不浮不躁，不争不抢，不计较，不强求。','date'=>'2017-11-10'),
	array('content'=>'做最原始的自己，比做任何复制品都来的好。','date'=>'2017-11-18'),
	array('content'=>'我就是我自已的太阳，无须凭借谁的光。','date'=>'2017-11-11'),
	array('content'=>'一心一明月，一树一年华。','date'=>'2017-11-16'),
	array('content'=>'这个世界至少有一个地方你可以控制——你的心境。','date'=>'2017-11-13'),
);

echo json_encode($news);
