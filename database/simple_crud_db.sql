-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2022 at 11:35 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simple_crud_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `isAdmin`, `email`, `password`) VALUES
(1, 'admin', 1, 'admin@admin.com', '$2a$12$WVE1eY6NLs/zbC0.gGgV7uLSf.yGerJgmeycDmzX75VWiMoPFM/1a'),
(2, 'user', 0, 'user@user.com', '$2a$12$qDrWAwyfPwu3hhLC0xQmy.zT.UMLYfoTH8vCOdY8ZNrPGbl26LQsC'),
(3, 'salman', 1, 'salman@admin.com', '$2a$12$nruKnhVZZbj.lHWkq0FT2Oeo12ZtFLd3vXUhz0v7cCX2MIAwWr1MO'),
(5, 'other user', 0, 'other.user@user.com', '$2a$12$nruKnhVZZbj.lHWkq0FT2Oeo12ZtFLd3vXUhz0v7cCX2MIAwWr1MO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
