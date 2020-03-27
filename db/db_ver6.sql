USE [Bank_LTHD]
GO

/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 3/27/2020 6:20:45 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TaiKhoan](
	[tendangnhap] [varchar](100) NOT NULL,
	[matkhau] [varchar](100) NOT NULL,
	[idloaitaikhoan] [int] NOT NULL,
	[mataikhoan] [varchar](100) NOT NULL,
	[refreshtoken] [varchar](100) NULL,
 CONSTRAINT [PK_TaiKhoan] PRIMARY KEY CLUSTERED 
(
	[mataikhoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[TaiKhoan]  WITH CHECK ADD  CONSTRAINT [FK_TaiKhoan_LoaiTaiKhoan] FOREIGN KEY([idloaitaikhoan])
REFERENCES [dbo].[LoaiTaiKhoan] ([id])
GO

ALTER TABLE [dbo].[TaiKhoan] CHECK CONSTRAINT [FK_TaiKhoan_LoaiTaiKhoan]

GO
CREATE PROC [dbo].[GetUserByTenDangNhap_v2]
	@tendangnhap varchar(100)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT tk.idloaitaikhoan, tttk.id, tttk.matk, tk.matkhau, tttk.email, tttk.sdt, tttk.image, tttk.sotaikhoan, tttk.tentaikhoan, tttk.sodu, tk.refreshtoken
	FROM TaiKhoan tk, ThongTinTaiKhoan tttk 
	WHERE tk.tendangnhap = @tendangnhap AND tk.mataikhoan = tttk.matk
END

GO
CREATE PROC [dbo].[EditUserRefreshToken]
	@mataikhoan nvarchar(100),
	@refreshtoken nvarchar(100)
AS
BEGIN
    UPDATE [TaiKhoan]
	SET refreshtoken = @refreshtoken
	WHERE mataikhoan = @mataikhoan
END

GO 
CREATE PROC [dbo].[GetUserByMaTaiKhoan]
	@mataikhoan varchar(100)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT tk.idloaitaikhoan, tk.tendangnhap, tttk.id, tttk.matk, tk.matkhau, tttk.email, tttk.sdt, tttk.image, tttk.sotaikhoan, tttk.tentaikhoan, tttk.sodu, tk.refreshtoken
	FROM TaiKhoan tk, ThongTinTaiKhoan tttk 
	WHERE tk.mataikhoan = @mataikhoan AND tk.mataikhoan = tttk.matk
END
