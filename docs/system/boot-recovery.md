# Boot Process and Recovery

## The boot sequence

1. **Firmware** (UEFI or BIOS) finds a boot device.
2. **Bootloader** (GRUB2) loads the kernel and the initramfs.
3. **Kernel** starts and mounts the root filesystem.
4. **systemd** starts services up to the default target.

## Find out why a boot failed

```bash
journalctl -b -1 -p err         # previous boot errors
systemctl --failed
```

## Recovery targets

```bash
sudo systemctl rescue           # single-user, with basic services
sudo systemctl emergency        # minimal shell with the root filesystem
```

A common cause of a failed boot is a bad `/etc/fstab` entry. Fix it from the emergency shell and test with `mount -a`.

## Reset a lost root password (RHEL 8 and 9)

Only do this on systems you are authorised to administer, with console access.

1. At the GRUB menu press `e`, add `rd.break` to the end of the `linux` line, then press `Ctrl+x`.
2. In the emergency shell:

```bash
mount -o remount,rw /sysroot
chroot /sysroot
passwd root
touch /.autorelabel          # fixes SELinux labels on the next boot
exit
exit
```

!!! tip
    Protect your systems from this by securing console and bootloader access, and by using disk encryption where appropriate.
