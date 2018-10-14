
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
CREATE TABLE `formules` (
  `id` int(11) NOT NULL,
  `formule_id` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL,
  `prix` int(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `formules`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `formules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
